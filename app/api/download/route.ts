import { NextResponse } from "next/server"

// Example GET handler (replace with your download logic)
export async function GET(request: Request) {
  // Here you would fetch/generate your file data. For example:
  // const fileData = ...;

  // For demonstration, we'll send a simple text file
  const fileData = Buffer.from("Hello, this is your file content!", "utf-8");

  return new NextResponse(fileData, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf", // Change as needed
      "Content-Disposition": `attachment; filename="document.pdf"`,
    },
  });
}