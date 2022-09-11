import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import BaseLayout from '../../templates/BasetLayout/BaseLayout';

const columns = [
  // {
  //   field: 'browser',
  //   headerName: 'Browser',
  //   width: 100,
  // },
  {
    field: 'message',
    headerName: 'Message',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    minWidth: 300,
  },
  // {
  //   field: 'level',
  //   headerName: 'Level',
  //   width: 100,
  // },
  {
    field: 'date',
    headerName: 'Date',
    minWidth: 144,
  },
  {
    field: 'path',
    headerName: 'Path',
    minWidth: 200,
    maxWidth: 300,
  },
];

const rows = [
  {
    id: '1',
    date: '2022-04-01 00:00',
    level: 'critical',
    path: '/path/to/hoge',
    browser: 'Chrome',
    message:
      ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '2',
    date: '2022-04-01 00:00',
    level: 'error',
    path: '/ja/docs/Web/Guide',
    browser: 'Chrome',
    message: 'Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '3',
    date: '2022-12-01 00:00',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: 'Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '4',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '5',
    level: 'critical',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '6',
    level: 'error',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '7',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '8',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '9',
    level: 'critical',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '10',
    level: 'error',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '11',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '12',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '13',
    level: 'critical',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '14',
    level: 'error',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '15',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '16',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '17',
    level: 'critical',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '18',
    level: 'error',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '19',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '20',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '21',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '22',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '23',
    level: 'critical',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '24',
    level: 'error',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '25',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '26',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
];

const ProjectPage = () => {
  return (
    <BaseLayout>
      <div style={{ flexGrow: 1, height: '836px' }}>
        <DataGrid
          css={{
            border: 0,
            // backgroundColor: 'white',
            // boxShadow:
            //   '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
            '.MuiDataGrid-columnHeaders': {
              border: 0,
            },
            '.MuiDataGrid-columnHeader:focus': {
              outline: 0,
            },
            '.MuiDataGrid-columnHeaderTitle': {
              color: '#6C6E6E',
              fontSize: '16px',
            },
            '.MuiDataGrid-cell': {
              border: 0,
              background: '#fff',
              padding: '0 20px',
            },
            '& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight) > .MuiDataGrid-cell': {
              whiteSpace: 'inherit',
            },
            '.MuiDataGrid-cellContent': {
              fontSize: '13px',
              display: '-webkit-box',
              '-webkit-line-clamp': '2',
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
              lineHeight: 1.8,
            },
            '.MuiDataGrid-columnSeparator': {
              display: 'none',
            },
          }}
          rows={rows}
          columns={columns}
          headerHeight={40}
          rowHeight={64}
          pageSize={20}
          density="comfortable"
          getRowSpacing={(params) => {
            const isCurrentLast = params.indexRelativeToCurrentPage === 19;

            return {
              top: 4,
              bottom: isCurrentLast ? 0 : 4,
            };
          }}
        />
      </div>
    </BaseLayout>
  );
};

export default ProjectPage;
