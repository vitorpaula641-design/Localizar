# NFC + localização com consentimento

Este projeto cria uma página que, após o visitante tocar em "Compartilhar minha localização" e conceder a permissão do navegador, envia a localização para o servidor.

## Antes de publicar
1. Instale Node.js.
2. Rode `npm install`.
3. Defina a variável `ADMIN_TOKEN` com um token secreto forte.
4. Rode `npm start`.
5. Gere um ID aleatório em `/api/new-id`.
6. Grave no NFC um link como:
   `https://SEU-DOMINIO/?id=SEU_ID`
7. Para consultar, abra `/painel.html` e informe o ID e o token.

## Importante
- A localização só é enviada depois da autorização do usuário.
- Use HTTPS quando publicar, porque navegadores normalmente exigem contexto seguro para geolocalização.
- Este exemplo guarda apenas a última localização em memória; reiniciar o servidor apaga os dados.
- Não use o sistema para tentar localizar alguém sem consentimento.
