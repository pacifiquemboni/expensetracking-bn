
// import PDFDocument from 'pdfkit';
// import path from 'path';
// import fs from 'fs';

// // Excel Export
// interface UserData {
//     Name: string;
//     Age: number;
//     Email: string;
// }

// export const exportToExcel = (data: UserData[], fileName: string): string => {
//     const workbook = xlsx.utils.book_new();
//     const worksheet = xlsx.utils.json_to_sheet(data);
//     xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//     const filePath = path.join(__dirname, `${fileName}.xlsx`);
//     xlsx.writeFile(workbook, filePath);
//     return filePath;
// };

// // PDF Export
// export const exportToPDF = (data: any[], fileName: any) => {
//   const doc = new PDFDocument();
//   const filePath = path.join(__dirname, `${fileName}.pdf`);
//   doc.pipe(fs.createWriteStream(filePath));
//   doc.fontSize(16).text('User Data', { underline: true });
//   data.forEach((item: { Name: any; Age: any; Email: any; }, index: number) => {
//     doc.fontSize(12).text(`${index + 1}. Name: ${item.Name}, Age: ${item.Age}, Email: ${item.Email}`);
//   });
//   doc.end();
//   return filePath;
// };
