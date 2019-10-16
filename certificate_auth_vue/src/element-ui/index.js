/*
* 先将所有都引入，最后删除不用的组件
* */
import Vue from 'vue'
import {
  Pagination,
  // Dialog,
  Autocomplete,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  // Menu,
  // Submenu,
  // MenuItem,
  // MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  // Popover,
  Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  Form,
  FormItem,
  // Tabs,
  // TabPane,
  // Tag,
  // Tree,
  Alert,
  // Slider,
  Icon,
  Row,
  Col,
  // Upload,
  // Progress,
  // Badge,
  // Card,
  // Rate,
  // Steps,
  // Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  // ColorPicker,
  // Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  // Footer,
  Loading,
  MessageBox,
  Message,
  // Notification
} from 'element-ui'
Vue.use(Pagination) //use
// Vue.use(Dialog)
Vue.use(Autocomplete)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(MenuItemGroup)
Vue.use(Input) //use
Vue.use(InputNumber) //use
Vue.use(Radio)  //use
Vue.use(RadioGroup) //use
Vue.use(RadioButton) //use
Vue.use(Checkbox) //use
Vue.use(CheckboxButton) //use
Vue.use(CheckboxGroup)//use
Vue.use(Switch) //use
Vue.use(Select) //use
Vue.use(Option) //use
Vue.use(OptionGroup) //use
Vue.use(Button) //use
Vue.use(ButtonGroup) //use
Vue.use(Table)  //use
Vue.use(TableColumn) //use
Vue.use(DatePicker)  //use
Vue.use(TimeSelect) //use
Vue.use(TimePicker) //use
// Vue.use(Popover)
Vue.use(Tooltip) //use
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
Vue.use(Form) //use
Vue.use(FormItem) //use
// Vue.use(Tabs)
// Vue.use(TabPane)
// Vue.use(Tag)
// Vue.use(Tree)
Vue.use(Alert) //use
// Vue.use(Slider)
Vue.use(Icon) //use
Vue.use(Row) //use
Vue.use(Col) //use
// Vue.use(Upload)
// Vue.use(Progress)
// Vue.use(Badge)
// Vue.use(Card)
// Vue.use(Rate)
// Vue.use(Steps)
// Vue.use(Step)
// Vue.use(Carousel)
// Vue.use(CarouselItem)
// Vue.use(Collapse)
// Vue.use(CollapseItem)
// Vue.use(Cascader)
// Vue.use(ColorPicker)
// Vue.use(Transfer)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Aside)
// Vue.use(Main)
// Vue.use(Footer)
Vue.use(Loading.directive)

import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$alert = MessageBox.alert //use
Vue.prototype.$confirm = MessageBox.confirm //use
export default {
  Pagination,
  // Dialog,
  Autocomplete,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  // Menu,
  // Submenu,
  // MenuItem,
  // MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  // Popover,
  Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  Form,
  FormItem,
  // Tabs,
  // TabPane,
  // Tag,
  // Tree,
  Alert,
  // Slider,
  Icon,
  Row,
  Col,
  // Upload,
  // Progress,
  // Badge,
  // Card,
  // Rate,
  // Steps,
  // Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  // ColorPicker,
  // Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  // Footer,
  Loading,
  MessageBox,
  Message,
  // Notification
}