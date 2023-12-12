"use client";
import { useEffect, useState } from "react";
import { action_log, report } from "@prisma/client";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, Container, Stack, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { Header } from "@/components/common/Header";

export default function AdminPanel() {
  const [actionLogs, setActionLogs] = useState<action_log[]>([]);
  const [reports, setReport] = useState<report[]>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  function fetchReports() {
    fetch("/api/report", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        const message = json.message;
        setReport(message);
      });
  }
  function fetchLogs() {
    fetch("/api/action-log", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        const message = json.message;
        setActionLogs(message);
      });
  }
  useEffect(() => {
    fetchLogs();
    fetchReports();
  }, []);

  const columns: GridColDef[] = [
    { field: "action", headerName: "Action", width: 200 },
    { field: "user_id", headerName: "User ID", width: 100 },
    { field: "additional_info", headerName: "Additional Info", width: 300 },
  ];
  function formatReportText(logs: action_log[]) {
    try {
      const formattedLogs = Object.values(logs).map((log) => {
        return (
          `Action Log ID: ${log.action_log_id}\n` +
          `Action: ${log.action}\n` +
          `User ID: ${log.user_id}\n` +
          `Additional Info: ${log.additional_info}\n\n`
        );
      });

      return formattedLogs.join("");
    } catch (error) {
      console.error("Error formatting report text:", error);
      return "Error formatting report text.";
    }
  }
  const createReport = () => {
    const selectedActionLogs = actionLogs.filter((log) =>
      rowSelectionModel.includes(log.action_log_id)
    );
    const prettyReportText = formatReportText(selectedActionLogs);
    fetch("/api/report", {
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("currentUser") ?? "",
      },
      method: "POST",
      body: JSON.stringify({
        text: prettyReportText,
      }),
    }).then(fetchReports);
  };
  const reportColumns: GridColDef[] = [
    { 
      field: "generation_date", 
      headerName: "Generation Date", 
      width: 200 
    },
    { 
      field: "text", 
      headerName: "Text", 
      width: 700,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', lineHeight: 'normal' }}>
          {params.value}
        </div>
      )
    },
  ];
  
  return (
    <Container maxWidth="xl">
      <Header />
      <Stack gap={2}>
        <Typography sx={{ mt: 5 }} variant="h5">Action Logs</Typography>
        <DataGrid
          rows={actionLogs}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          getRowId={(row) => row.action_log_id}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
        <Button
          fullWidth
          onClick={createReport}
          disabled={rowSelectionModel.length === 0}
        >
          Create Report
        </Button>
        <Typography sx={{ mt: 5 }} variant="h5">Reports</Typography>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={reports}
          columns={reportColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          checkboxSelection
          getRowId={(row) => row.report_id}
        />
      </Stack>
    </Container>
  );
}
