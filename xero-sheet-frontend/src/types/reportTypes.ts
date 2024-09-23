export interface ReportCell {
    Value: string | null;
    Attributes?: { Value: string; Id: string }[];
}

export interface ReportRow {
    RowType: string;
    Title?: string;
    Cells: ReportCell[];
    Rows?: ReportRow[];
}


export interface Report {
    ReportID: string;
    ReportName: string;
    ReportType: string;
    ReportTitles: string[];
    Rows: ReportRow[];
}

export interface ReportResponse {
    Reports: Report[];
}
