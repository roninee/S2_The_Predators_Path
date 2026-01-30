import tkinter as tk
from tkinter import Menu
import os

def read_reminder_file():
    file_path = 'reminder_top.txt'
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.readlines()
        return [line.strip() for line in content if line.strip()]
    return []

def create_reminder_window():
    root = tk.Tk()
    root.overrideredirect(True)
    root.attributes('-topmost', True)

    # 设置背景为透明色（这里用 black）
    transparent_color = 'black'
    root.configure(bg=transparent_color)
    root.wm_attributes('-transparentcolor', transparent_color)

    screen_width = root.winfo_screenwidth()

    reminder_lines = read_reminder_file()
    if not reminder_lines:
        reminder_lines = ["不要随便笑"]

    reminder_text = "\n".join(reminder_lines)
    label = tk.Label(root, text=reminder_text, fg='yellow',
                     bg=transparent_color, font=("Arial", 20),
                     justify='center')
    label.pack(padx=10, pady=10)

    # 先更新布局，然后获取推荐尺寸（reqwidth/reqheight）
    root.update_idletasks()
    window_width = label.winfo_reqwidth() + 20
    window_height = label.winfo_reqheight() + 20

    x = (screen_width - window_width) // 2
    y = 20
    root.geometry(f'{window_width}x{window_height}+{x}+{y}')

    # 右键菜单
    menu = Menu(root, tearoff=0)
    menu.add_command(label="关闭窗口", command=root.destroy)
    root.bind("<Button-3>", lambda event: menu.tk_popup(event.x_root, event.y_root))

    # 拖动窗口
    def start_move(event):
        root.x = event.x
        root.y = event.y

    def do_move(event):
        x = event.x_root - root.x
        y = event.y_root - root.y
        root.geometry(f'+{x}+{y}')

    root.bind("<Button-1>", start_move)
    root.bind("<B1-Motion>", do_move)

    return root

if __name__ == "__main__":
    root = create_reminder_window()
    root.mainloop()
