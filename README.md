### Configurar el entorno
1. Instala Rust desde https://rustup.rs/
2. Instala Solana desde https://docs.solana.com/cli/install-solana-cli-tools#use-solanas-install-tool

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
