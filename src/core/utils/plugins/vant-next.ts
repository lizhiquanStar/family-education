import {
  Dialog,
  Button,
  Lazyload,
  Toast,
  Icon,
  Loading,
  Sticky,
  Tabs,
  Tab,
  RadioGroup,
  Radio,
  DropdownMenu,
  DropdownItem,
  Tag,
  Cell,
  SwipeCell,
  CellGroup,
  Row,
  Col,
  Form,
  Cascader,
  Popup,
  NavBar,
  Image,
  Field
} from 'vant'
export default {
  install: app => {
    app
      .use(Dialog)
      .use(Loading)
      .use(Sticky)
      .use(Tabs)
      .use(Tab)
      .use(RadioGroup)
      .use(Radio)
      .use(DropdownMenu)
      .use(DropdownItem)
      .use(Tag)
      .use(CellGroup)
      .use(Cell)
      .use(Row)
      .use(Col)
      .use(Cascader)
      .use(Popup)
      .use(Field)
      .use(Form)
      .use(SwipeCell)
      .use(NavBar)
      .use(Image)
    app.use(Button)
    app.use(Toast)
    app.use(Icon)
    app.use(Lazyload, { lazyComponent: true })
  }
}
