'use strict';

/**
 * Dependencies.
 */

var polarity = require('wooorm/polarity@0.2.0');
var ParseLatin = require('wooorm/parse-latin@0.4.0');
var emoji = require('wooorm/nlcst-emoji-modifier@0.1.0');
var nlcstToString = require('wooorm/nlcst-to-string@0.1.2');

/**
 * ParseLatin
 */

var parser = new ParseLatin();

emoji(parser);

/**
 * DOM elements.
 */

var $input = document.getElementsByTagName('textarea')[0];
var $output = document.getElementsByTagName('div')[0];

/**
 * Event handlers
 */

function oninputchange() {
    var result;

    result = polarity(
        parser.tokenizeSentence($input.value).children.map(nlcstToString)
    );

    $output.setAttribute('data-polarity', result.polarity);

    if (result.polarity > 0) {
        $output.setAttribute('data-valence', 'positive');
    } else if (result.polarity < 0) {
        $output.setAttribute('data-valence', 'negative');
    } else {
        $output.setAttribute('data-valence', 'neutral');
    }

    $output.innerHTML = [
        'polarity: ' + result.polarity,
        'positivity: ' + result.positivity,
        'negativity: ' + result.negativity,
        'positive: ' + result.positive.join('; '),
        'negative: ' + result.negative.join('; ')
    ].join('<br />');
}

/**
 * Attach event handlers.
 */

$input.addEventListener('input', oninputchange);

/**
 * Provide initial answer.
 */

oninputchange();
