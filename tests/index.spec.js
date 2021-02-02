const { mount, createLocalVue } = require('@vue/test-utils');
const VueImageWatermark = require('../src');

const vue = createLocalVue();

vue.use(VueImageWatermark);

test("test1", () => {});
