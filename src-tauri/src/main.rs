// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs::File, fs::metadata, process::Command};
use fs_extra::dir::get_size;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
fn get_file_size(target_file: String) -> Result<u64, String> {
    match metadata(target_file) {
        Ok(metadata) => Ok(metadata.len()),
        Err(err) => Err(format!("Error getting file metadata: {}", err))
    }
}

#[tauri::command]
fn get_folder_size(target_dir: String) -> Result<u64, String>{
  let folder_size = get_size(target_dir).unwrap();
  Ok(folder_size)
}

#[tauri::command]
async fn unzip_archive(archive_path: String, target_dir: String) -> Result<String, String> {
  let _target_dir = std::path::PathBuf::from(target_dir.clone()); // Doesn't need to exist

  zip_extract::extract(File::open(&archive_path).expect("Failed to open archive file"), &_target_dir, true).expect("Failed to extract archive");

  Ok(target_dir)
}

#[tauri::command]
fn set_keyring(player: String, password: String) -> Result<(), String> {
    let entry = keyring::Entry::new("atavismxi", &player).map_err(|err| err.to_string())?;
    entry.set_password(&password).map_err(|err| err.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_keyring(player: String) -> Result<bool, String> {
    match keyring::Entry::new("atavismxi", &player) {
        Ok(entry) => {
            match entry.get_password() {
                Ok(_) => Ok(true),
                Err(_) => Ok(false),
            }
        }
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
fn is_wine_installed() -> bool {
    let output = Command::new("wine")
        .arg("--version")
        .output()
        .ok();

        output.map_or(false, |o| o.status.success())
}

#[tauri::command(async)]
fn run_wine(installed_dir: &str, player_name: String) -> String {

    let password = match get_password(player_name.clone()) {
        Ok(p) => p,
        Err(err) => {
            eprintln!("Failed to get password from keyring: {}", err);
            return "Error getting password from keyring".to_string();
        }
    };

    let output = std::process::Command::new("wine")
        .current_dir(installed_dir)
        .arg("Ashita-cli.exe")
        .arg("AtavismXI.ini")
        .arg(format!("{} {}", "--user", player_name))
        .arg(format!("{} {}", "--password", password))
        .output()
        .expect("Failed to run Wine command");

    String::from_utf8_lossy(&output.stdout).to_string()
}

fn get_password(player: String) -> Result<String, String> {
    let entry = keyring::Entry::new("atavismxi", &player).map_err(|err| err.to_string())?;
    let password = entry.get_password().map_err(|err| err.to_string())?;
    Ok(password)
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![unzip_archive, set_keyring, get_keyring, is_wine_installed, run_wine, get_folder_size, get_file_size])
        .plugin(tauri_plugin_fs_watch::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_upload::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
