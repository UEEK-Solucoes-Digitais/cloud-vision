import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'
import postcssImport from 'postcss-import'
import postcssMixins from 'postcss-mixins'
import postcssNested from 'postcss-nested'
import postcssPresetEnv from 'postcss-preset-env'
import postcssReporter from 'postcss-reporter'
import postcssSimpleVars from 'postcss-simple-vars'

export default {
    plugins: [
        postcssImport(),
        postcssPresetEnv({
            stage: 2,
            insertBefore: {
                'all-property': postcssSimpleVars,
            },
        }),
        postcssNested(),
        postcssMixins(),
        postcssFlexbugsFixes(),
        postcssReporter({
            clearReportedMessages: true,
            throwError: true,
        }),
        autoprefixer(),
        cssnano({
            preset: [
                'default',
                {
                    discardComments: { removeAll: true },
                    normalizeWhitespace: true,
                    discardUnused: true,
                    mergeRules: true,
                    minifySelectors: true,
                    convertValues: false,
                    discardDuplicates: true,
                    discardOverridden: true,
                },
            ],
        }),
    ],
}
