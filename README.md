### Configurar el entorno

Instala Rust (ref.: https://rustup.rs/). En Linux, para instalar Rust:
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Instala Solana (ref.: https://docs.solana.com/cli/install-solana-cli-tools#use-solanas-install-tool). En Linux para instalar el CLI de Solana, que viene con el `test validator`
```
$ sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```
Configura el validador a tu localhost 
```
solana config set --url localhost
```

Para obtener configuracion de tu configuracion de sonala
```
solana config get
```


### Construye y prueba para un programa compilado nativamente
```
$ cargo build
$ cargo test
```

### Construye y pueba el programa compilaod para BPF
```
$ cargo build-bpf
$ cargo test-bpf
```

### Despliega el programa en devnet
```
solana program deploy <DIRECTORIO_PROGRAMA>
```
Si el programa se desplegó exitosamente, se devolverá un identificador de programa, como por ejemplo:
```
Program Id: 3KS2k14CmtnuVv2fvYcvdrNgC94Y11WETBpMUGgXyWZL
```
