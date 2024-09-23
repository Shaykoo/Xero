import { render } from '@testing-library/react';
import App from './App';
import { getReport } from './service/report-service';
import { ReportResponse } from './types/reportTypes';

jest.mock('./service/report-service');

const mockReportData: ReportResponse = {
  Reports: [{
    ReportID: '1',
    ReportName: 'Test Report',
    ReportType: 'Monthly', // ReportType
    ReportTitles: ['Title 1', 'Title 2'],
    Rows: [
      { RowType: 'Section', Title: 'Section 1', Cells: [], Rows: [] },
      { RowType: 'Section', Title: 'Section 2', Cells: [], Rows: [] }
    ]
  }]
};



describe('App component', () => {
  test('renders report name and titles', async () => {
    (getReport as jest.Mock).mockResolvedValue(mockReportData);

    const { findByText, queryByText } = render(<App />);

    expect(await findByText(/Report: Test Report/)).toBeInTheDocument();
    expect(queryByText('Title 1')).toBeInTheDocument();
    expect(queryByText('Title 2')).toBeInTheDocument();
  });

  test('displays error when report fetch fails', async () => {
    (getReport as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    const { findByText, queryByText } = render(<App />);

    expect(await findByText(/Failed to fetch the Report/)).toBeInTheDocument();
    expect(queryByText('Title 1')).not.toBeInTheDocument();
  });
});
