import { Meta, StoryObj } from '@storybook/react'

import LastLoginInfo from '../src/components/Authentication/LastLoginInfo'
import { LoginMethods } from '../src/components/Authentication/LoginMethod'
import { LOGIN_METHOD_EMAIL } from '../src/utils/SynapseConstants'

const meta = {
  title: 'Authentication/LastLoginInfo',
  component: LastLoginInfo,
  argTypes: {
    lastLoginMethod: {
      options: LoginMethods,
      control: 'radio',
    },
    lastLoginDate: {
      control: 'text',
    },
  },
  parameters: {
    design: [
      {
        name: 'sentence',
        type: 'figma',
        url: 'https://www.figma.com/file/TOcmJ2QHr51v8Huv3wIec9/Sage-Registration-App?type=design&node-id=2713-54506',
      },
      {
        name: 'box',
        type: 'figma',
        url: 'https://www.figma.com/file/TOcmJ2QHr51v8Huv3wIec9/Sage-Registration-App?type=design&node-id=2692-56233',
      },
    ],
  },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    currentSourceAppName: 'ARK Portal',
    lastLoginMethod: LOGIN_METHOD_EMAIL,
    lastLoginSourceAppName: 'AD Knowledge Portal',
    lastLoginSourceAppURL: 'https://adknowledgeportal.synapse.org/',
    lastLoginDate: 'May 10, 2023',
    display: 'sentence',
  },
}
