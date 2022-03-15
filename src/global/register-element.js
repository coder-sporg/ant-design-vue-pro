import { Button } from 'ant-design-vue'

const components = [Button]

export default function (app) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
