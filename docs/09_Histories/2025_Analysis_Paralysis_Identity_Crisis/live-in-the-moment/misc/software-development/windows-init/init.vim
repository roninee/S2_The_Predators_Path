call plug#begin()

Plug 'https://github.com/easymotion/vim-easymotion'
Plug 'https://github.com/tpope/vim-surround'
Plug 'michaeljsmith/vim-indent-object'

Plug 'andymass/vim-matchup'








call plug#end()

  au TextYankPost * silent! lua vim.highlight.on_yank {higroup="IncSearch", timeout=1000}




