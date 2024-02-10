// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs::File, fs::create_dir_all, fs::metadata, process::Command};

use std::io;
use std::path::Path;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct ZipUnzipEvent {
    path: String,
    error: bool,
    message: String,
    archive_len: usize,
    files_unzipped: usize
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
async fn unzip(window: tauri::Window, source: String, target: String, debug: bool) -> Result<(), String> {
  let source_path = Path::new(&source);
    let target_path = Path::new(&target);

    let _ = window.emit("unzip", ZipUnzipEvent {
        error: false,
        message: format!("Trying to unzip {}", &source),
        path: source.to_string(),
        archive_len: 0,
        files_unzipped: 0
    });

    let file = match File::open(&source_path) {
        Ok(file) => file,
        Err(err) => {
            let _ = window.emit("unzip", ZipUnzipEvent {
                error: true,
                path: source,
                message: format!("Failed to open zip file, {}", err),
                archive_len: 0,
                files_unzipped: 0
            });

            return Err(format!("Failed to open zip file: {}", err));
        }
    };

    let mut archive = match zip::ZipArchive::new(file) {
        Ok(archive) => archive,
        Err(err) => return Err(format!("Failed to read zip file: {}", err)),
    };

    let archive_length = archive.len();

    for i in 0..archive.len() {
        let mut file = match archive.by_index(i) {
            Ok(file) => file,
            Err(err) => return Err(format!("Failed to read file in zip: {}", err)),
        };

        let outpath = match file.enclosed_name() {
            Some(path) => target_path.join(path),
            None => continue,
        };

        if let Some(parent_dir) = outpath.parent() {
            if !parent_dir.exists() {
                create_dir_all(parent_dir).unwrap();
            }
        }

        if file.is_dir() {
            if debug {
                println!("Directory {} extracted to \"{}\"", i, outpath.display());
            }
            create_dir_all(&outpath).unwrap();
        } else {
            if debug {
                println!(
                    "File {} extracted to \"{}\" ({} bytes)",
                    i,
                    outpath.display(),
                    file.size()
                );
            }
            let mut outfile = File::create(&outpath).unwrap();
            io::copy(&mut file, &mut outfile).unwrap();

            let _ = window.emit("unzip", ZipUnzipEvent {
                path: outpath.display().to_string(),
                error: false,
                message: format!("Processed {}", file.name()),
                archive_len: archive_length,
                files_unzipped: i + 1
            });
        }
    }

    Ok(())
}


#[tauri::command]
fn get_file_size(target_file: String) -> Result<u64, String> {
    match metadata(target_file) {
        Ok(metadata) => Ok(metadata.len()),
        Err(err) => Err(format!("Error getting file metadata: {}", err))
    }
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
        .invoke_handler(tauri::generate_handler![unzip, set_keyring, get_keyring, is_wine_installed, run_wine, get_file_size])
        .plugin(tauri_plugin_fs_watch::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_upload::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
