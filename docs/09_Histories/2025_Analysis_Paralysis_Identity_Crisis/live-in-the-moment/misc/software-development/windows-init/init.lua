-- 必要的vim插件
-- C-q进入块模式。可视模式是这是选择文本块的唯一方法。
-- telescope.nvim： 精通
-- Which-key: 例如输入d，然后wait 300ms
-- leaderkey：善用leader
--
-- nvim-tree.lua： file explore
-- comment
-- leap.nvim：可选
-- barbar 可选
-- oilvim ：nvim-tree 相同功能

local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)


-- Example using a list of specs with the default options
vim.g.mapleader = "'" -- Make sure to set `mapleader` before lazy so your mappings are correct
--vim.g.maplocalleader = "\\" -- Same for `maplocalleader`

-- My Config
vim.keymap.set("i", "jk", "<ESC>")

-- 这些键绑定可能是 Neovim 中运动的最基本必需品——窗口运动。明显。

-- U = redo
vim.keymap.set("n", "U", "<C-r>")

-- tab movements
vim.keymap.set("n", "<leader>n", ":bn<CR>")

vim.keymap.set("n", "<C-h>", "<C-w>h")
vim.keymap.set("n", "<C-j>", "<C-w>j")
vim.keymap.set("n", "<C-k>", "<C-w>k")
vim.keymap.set("n", "<C-l>", "<C-w>l")

-- terminal
vim.keymap.set("t", "<C-h>", "<cmd>wincmd h<CR>")
vim.keymap.set("t", "<C-j>", "<cmd>wincmd j<CR>")
vim.keymap.set("t", "<C-k>", "<cmd>wincmd k<CR>")
vim.keymap.set("t", "<C-l>", "<cmd>wincmd l<CR>")

-- 调整窗口大小并不常见（至少对我来说是这样），这就是为什么我选择将其映射到箭头键的原因。
-- 这样，我就有了更重要的键绑定的键盘映射，而不是调整窗口大小。这些不是必需的，
-- 因为 Neovim 允许鼠标支持，但很高兴拥有它。
vim.keymap.set("n", "<C-Up>", ":resize -2<CR>")
vim.keymap.set("n", "<C-Down>", ":resize +2<CR>")
vim.keymap.set("n", "<C-Left>", ":vertical resize -2<CR>")
vim.keymap.set("n", "<C-Right>", ":vertical resize +2<CR>")

-- terminal
vim.keymap.set("t", "<C-Up>", "<cmd>resize -2<CR>")
vim.keymap.set("t", "<C-Down>", "<cmd>resize +2<CR>")
vim.keymap.set("t", "<C-Left>", "<cmd>vertical resize -2<CR>")
vim.keymap.set("t", "<C-Right>", "<cmd>vertical resize +2<CR>")

vim.keymap.set({'n', 'x', 'o'}, 'H', '^')
vim.keymap.set({'n', 'x', 'o'}, 'L', '$')

vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")
---- Normal mode
vim.keymap.set('n', '<Leader>w', ':write<CR>')
--vim.keymap.set('n', '<Leader>a', ':wqa<CR>')
--vim.keymap.set('n', '<Leader>x', ':wq<CR>')

---- Insert mode
--map('i', ';w', '<esc>:write<CR>')

-- Alt/Meta + c to capitalize the inner word
vim.keymap.set('n', '<M-c>', 'guiw~w', defaults)

-- Alt/Meta + u to capitalize the inner word
vim.keymap.set('n', '<M-u>', 'gUiww', defaults)

-- Alt/Meta + l to capitalize the inner word
vim.keymap.set('n', '<M-l>', 'guiww', defaults)


-- 现实行号和相对行号
vim.opt.number = true
vim.opt.relativenumber = true

require("lazy").setup({{
"folke/which-key.nvim",
  event = "VeryLazy",
  init = function()
    vim.o.timeout = true
    vim.o.timeoutlen = 300
  end,
  opts = {
    -- your configuration comes here
    -- or leave it empty to use the default settings
    -- refer to the configuration section below
  }
},

-- init.lua:
    {
    'nvim-telescope/telescope.nvim', tag = '0.1.6',
-- or                              , branch = '0.1.x',
      dependencies = { 'nvim-lua/plenary.nvim' }
    }
})

local builtin = require('telescope.builtin')
vim.keymap.set('n', '<leader>ff', builtin.find_files, {})
vim.keymap.set('n', '<leader>fg', builtin.live_grep, {})
vim.keymap.set('n', '<leader>fb', builtin.buffers, {})
vim.keymap.set('n', '<leader>fh', builtin.help_tags, {})
