import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';
import registry from './studio.components.json' with { type: 'json' };

const callout = registry.components.find(item => item.name === 'callout');
const types = { string: String, boolean: Boolean, number: Number, integer: Number };
const attributes = Object.fromEntries(Object.entries(callout.props.properties).map(([name, field]) => [name, {
  type: types[field.type], required: callout.props.required.includes(name),
  ...(field.default !== undefined ? { default: field.default } : {}),
  ...(field.enum ? { matches: field.enum } : {}),
}]));

// Authors use named tags; component imports and validation live here.
export default defineMarkdocConfig({
  tags: {
    callout: {
      render: component(`./${callout.component}`),
      attributes,
    },
  },
  nodes: {
    link: { ...nodes.link, render: component('./src/components/MarkdocLink.astro') },
    image: { ...nodes.image, render: component('./src/components/MarkdocImage.astro') },
  },
});
