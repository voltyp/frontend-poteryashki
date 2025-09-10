module.exports = {
  root: true,
  env: { node: true },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/prettier', // Prettier глобально включён...
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      extends: ['plugin:vue/vue3-recommended'],
      rules: {
        // ...но для .vue мы его отключаем, чтобы не ломал выравнивание
        'prettier/prettier': 'off',

        // // первый атрибут — рядом с тегом
        'vue/first-attribute-linebreak': [
          'error',
          {
            singleline: 'beside',
            multiline: 'beside',
          },
        ],
        'vue/html-closing-bracket-newline': [
          'error',
          {
            singleline: 'never', // однострочные — без переноса
            multiline: 'never', // многострочные НЕ переносят ">"
            selfClosingTag: {
              singleline: 'never', // <Comp ... /> в одну строку — без переноса
              multiline: 'always', // <Comp ... \n /> — переносить только "/>"
            },
          },
        ],
        //
        // // по одному атрибуту на строку
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: 3,
            multiline: { max: 1 },
          },
        ],
        //
        // // ВЫРАВНИВАНИЕ по первому атрибуту
        // 'vue/html-indent': [
        //   'error',
        //   2,
        //   {
        //     // базовый отступ внутри шаблонов
        //     baseIndent: 0,
        //     // если атрибуты переносятся — каждый с одной «ступенькой» (2 пробела)
        //     attribute: 1,
        //     // закрывающую скобку не сдвигаем дополнительно
        //     closeBracket: 0,
        //     // ГЛАВНОЕ: выравнивать перенесённые атрибуты по первому
        //     alignAttributesVertically: true,
        //   },
        // ],
      },
    },
  ],
};
