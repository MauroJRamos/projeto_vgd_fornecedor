# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['Principal.py', 'ConectorDB.py', 'ConfigParser.py', 'ArquivosDAO.py', 'FornecedorDAO.py', 'LogFornecedoresDAO.py', 'ListaManager.py', 'EncontrarArquivo5.py', 'FornecedorValidator.py'],
    pathex=[],
    binaries=[],
    datas=[('config.ini', '.')],
    hiddenimports=['openpyxl', 'configparser', 'logging', 'mysql.connector'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='Principal',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='Principal',
)
