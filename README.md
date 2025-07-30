# 🎨 Tattouleta do Destino

**[➡️ Teste a Tattouleta aqui!](https://spin-a-wheel.vercel.app)**

## Sobre o Projeto

A Tattouleta do Destino é uma roleta interativa e bem-humorada que decide a sua "sorte" no mundo da tatuagem.

Este projeto foi criado para treinar habilidades de desenvolvimento web e, principalmente, para nos divertirmos no processo.

## ✨ Tecnologias Mágicas

Nenhuma biblioteca ou framework complicado foi usado aqui. Apenas o trio de poder da web:

-   **HTML5**: Para a estrutura básica da página.
-   **CSS3**: Onde a mágica visual acontece! Usamos `conic-gradient` para criar as fatias coloridas da roleta, `transform` para as animações de rotação e `clip-path` para os cortes precisos.
-   **JavaScript**: O cérebro por trás de tudo. O JS é responsável por:
    -   Criar a roleta e suas fatias dinamicamente.
    -   Calcular o posicionamento e a contra-rotação do texto para que ele fique sempre legível.
    -   Controlar a animação de giro e calcular o resultado com uma precisão matemática invejável.

## 🧙‍♂️ Como a Mágica Acontece

1.  **A Roleta Nasce**: A roleta não é uma imagem, mas sim um `div` cujo fundo é um `conic-gradient` gerado dinamicamente via JavaScript. Isso nos permite trocar as cores com facilidade.
2.  **O Texto Desafiador**: Fazer o texto ficar em pé enquanto a roleta gira foi o nosso maior desafio. A solução? Um truque de mestre com CSS `transform`: rotacionamos o contêiner do texto junto com a fatia e, em seguida, aplicamos uma **contra-rotação** no próprio texto para mantê-lo sempre na vertical.
3.  **O Giro da Sorte**: A animação de giro usa `transition` com uma função `cubic-bezier` para dar aquela sensação suave de aceleração e desaceleração. Quando a roleta para, o JavaScript calcula o ângulo final e determina qual foi a fatia vencedora.

## 🚀 Como Rodar Localmente

Quer brincar com o código? É muito simples:

1.  Clone este repositório:
    ```bash
    git clone https://github.com/igorandrade23/spin-a-wheel.git
    ```
2.  Abra o arquivo `index.html` no seu navegador favorito.
3.  Pronto! Gire a roleta e divirta-se.

## 🏆 Créditos

-   **Desenvolvedor**: [Igor Andrade](https://github.com/igorandrade23)

Feito com muito código, criatividade e algumas risadas.
