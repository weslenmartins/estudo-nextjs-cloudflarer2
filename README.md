# Estudo de Upload Cloudflare R2 (AWS-SDK)

Projeto para estudar o upload para a plataforma da Cloudflare R2, utilizando React.js.

![Print de um pedaço do site](https://github.com/weslenmartins/estudo-nextjs-cloudflarer2/blob/main/public/cover.gif?raw=true)

## Aplicado ao projeto
- AWS-SDK
- Cloudflare R2
- Nextj.js
- [Filepond](https://pqina.nl/filepond/)
- Typescript
- TailwindCSS

## Breve descritivo de soluções do projeto.

### Configuração básica.

Adicione os TOKENS gerados na plataforma de cloud no arquivo `.env`

Um exemplo foi adicionado ao projeto:

```
CLOUDFLARE_R2_ACCOUNT_ID=
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_BUCKET=
```

### Upload
Para o upload é utilizado uma server function do Next.js conectado ao aws-sdk v3.

Um exemplo é acessando o endereço `http://localhost:3000/` um formulário básico oferece um input para o envio.

A rota acionada para o envio é a `http://localhost:3000/api/upload`

### Upload multi arquivos
Exemplo com um form para múltiplos arquivos é `http://localhost:3000/multi`.

A rota acionada para o envio é a `http://localhost:3000/api/upload`

### Upload com Filepond
Modelo de form com aplicação da lib [Filepond](https://pqina.nl/filepond/) oferece um visual mais interativo e moderno para os upload, acesse o exemplo em `http://localhost:3000/filepond` 

A rota acionada para o envio é a `http://localhost:3000/api/upload`

---

Outros exemplos e testes podem ser encontrados neste projeto.

### Listar todos os arquivos da Bucket.
Acesse a rota `http://localhost:3000/api/all-file` via GET.

### Listando um arquivo específico
Acesse a rota `http://localhost:3000/api/file/NOME_DO_ARQUIVO` via GET.

### Deletar um arquivo especifico
Acesse a rota `http://localhost:3000/api/delete/NOME_DO_ARQUIVO` via DELETE.

### Upload
Acesse a rota `http://localhost:3000/api/upload` via POST.
### Upload de um arquivo fixo via fileSystem.
Acesse a rota `http://localhost:3000/api/fixed-file` via POST.
