use std::fs::OpenOptions;
use std::io::Write;
use std::path::{Path, PathBuf};
use tauri::Manager;

#[tauri::command]
fn append_log_line(path: String, line: String) -> Result<(), String> {
    // base: projectルート想定 (dev時は src-tauri の親を狙う)
    let cwd = std::env::current_dir().map_err(|e| e.to_string())?;
    let base = cwd.parent().unwrap_or(&cwd).to_path_buf();
    let target: PathBuf = if Path::new(&path).is_absolute() {
        PathBuf::from(&path)
    } else {
        base.join("data").join(path)
    };

    if let Some(dir) = target.parent() {
        std::fs::create_dir_all(dir).map_err(|e| e.to_string())?;
    }
    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open(&target)
        .map_err(|e| e.to_string())?;
    let mut line_to_write = line;
    line_to_write.push('\n');
    file.write_all(line_to_write.as_bytes())
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn save_coordinates(path: String, content: String) -> Result<(), String> {
    let target: PathBuf = PathBuf::from(&path);

    // Create parent directories if they don't exist
    if let Some(dir) = target.parent() {
        std::fs::create_dir_all(dir).map_err(|e| e.to_string())?;
    }

    // Write content to file
    std::fs::write(&target, content.as_bytes()).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            // Maximize the main webview window on startup
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.maximize();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![append_log_line, save_coordinates])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
