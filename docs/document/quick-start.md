# vant-template
规范说明：
1、单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。
2、和父组件紧密耦合的子组件应该以父组件名作为前缀命名（TodoList, TodoListItem）
3、在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板中应该始终使用 kebab-case。
4、标签的 Props 应该有统一的顺序，依次为指令、属性和事件。
5、组件选项应该有统一的顺序。
```
export default {
  name: '',

  components: {},

  props: {},

  emits: [],

  setup() {},

  data() {},

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  unmounted() {},

  methods: {}
}
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
