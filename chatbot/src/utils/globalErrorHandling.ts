import { NextRequest, NextResponse } from "next/server";

function withErrorHandler(fn: any) {
  return async function (request: any, ...args: any) {
    try {
      return await fn(request, ...args);
    } catch (error) {
      // Log the error to a logging system
      // Respond with a generic 500 ISE for now
      console.error(error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}

export default withErrorHandler;