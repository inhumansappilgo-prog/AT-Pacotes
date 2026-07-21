# MARVEL'S AXIAL — Página de Pacotes

Página seletora das sete categorias de pacotes da Terra Axial.

## Arquivos para o GitHub Pages

Envie para a raiz do repositório:

- `index.html`
- `styles.css`
- `app.js`
- `pacotes-standalone.html` — opcional
- `README.md` — opcional

## Categorias

- Cósmicos: https://universoaxial.tumblr.com/cosmicos
- Dimensionais: https://universoaxial.tumblr.com/dimensionais
- Genéticos: https://universoaxial.tumblr.com/geneticos
- Místicos: https://universoaxial.tumblr.com/misticos
- Mutantes: https://universoaxial.tumblr.com/mutantes
- Tecnológicos: https://universoaxial.tumblr.com/tecnologicos
- Urbanos: https://universoaxial.tumblr.com/urbanos

## Comportamento dos cards

Cada card possui:

- formato vertical;
- filtro vermelho analógico;
- scanlines e oscilação de sinal;
- zoom e profundidade no hover;
- revelação da barra “Entrar no arquivo”;
- animação de expansão ao clicar;
- transição de portal antes do redirecionamento;
- `target="_top"` para sair corretamente do iframe do Tumblr.

## Iframe para o Tumblr

```html
<title>MARVEL'S AXIAL</title>

<link
  rel="icon"
  type="image/png"
  href="https://i.imgur.com/yiuD6Ad.png"
>

<iframe
  src="LINK-DO-GITHUB-PAGES"
  title="MARVEL'S AXIAL — PACOTES"
  style="position:fixed;top:0;left:0;width:100%;height:100%;border:0;margin:0;padding:0;overflow:auto;z-index:999999;">
</iframe>
```
