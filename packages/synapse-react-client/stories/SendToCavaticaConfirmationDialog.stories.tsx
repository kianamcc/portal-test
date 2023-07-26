import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { QueryContextProvider } from '../src/components/QueryContext'
import { QueryVisualizationContextProvider } from '../src/components/QueryVisualizationWrapper'
import {
  mockQueryBundleRequest,
  mockQueryResultBundle,
} from '../mocks/mockFileViewQuery'
import { deepClone } from '@mui/x-data-grid/utils/utils'
import { displayToast } from '../src/components/ToastMessage'
import SendToCavaticaConfirmationDialog from '../src/components/SynapseTable/SendToCavaticaConfirmationDialog'

const meta = {
  title: 'Explore/Send to CAVATICA Dialog',
  component: SendToCavaticaConfirmationDialog,
  argTypes: {
    hasRowSelection: {
      description:
        'Simulates whether or not the table has row selection enabled.',
      control: { type: 'boolean' },
    },
    unitDescription: {
      description: 'A word describing what each row represents',
      control: { type: 'text' },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3l3RjDnKnv8jms2XFR5BQu/Main?type=design&node-id=1909-58523',
    },
  },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  name: 'Send to CAVATICA Dialog',
  args: {
    hasRowSelection: false,
    unitDescription: 'file',
  },
  decorators: [
    (Story, { args }) => {
      return (
        <QueryContextProvider
          queryContext={{
            data: mockQueryResultBundle,
            getCurrentQueryRequest: () => deepClone(mockQueryBundleRequest),
          }}
        >
          <QueryVisualizationContextProvider
            queryVisualizationContext={{
              isShowingExportToCavaticaModal: true,
              setIsShowingExportToCavaticaModal: () => {
                displayToast('close modal called')
              },
              isRowSelectionVisible: args.hasRowSelection,
              selectedRows: args.hasRowSelection
                ? mockQueryResultBundle.queryResult!.queryResults.rows.slice(
                    0,
                    2,
                  )
                : [],
              unitDescription: args.unitDescription,
            }}
          >
            <Story />
          </QueryVisualizationContextProvider>
        </QueryContextProvider>
      )
    },
  ],
}
