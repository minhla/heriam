import Button from "./components/Button"
import FormLabel from "./components/FormLabel"
import Container from "./components/Container"
import Input from "./components/Input"
import Text from "./components/Text"
import Heading from "./components/Heading"

import globalStyles from "./global"

const componentOverrides = {
  components: {
    Button,
    FormLabel,
    Container,
    Input,
    Text,
    Heading,
  },
};

const themeOverrides = {...componentOverrides,...globalStyles}

export default themeOverrides;
