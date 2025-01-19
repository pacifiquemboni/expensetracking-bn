const express = require('express');
const router = express.Router();
// const jsreport = require('jsreport'); // Removed duplicate declaration
// const fs = require('fs'); // Removed duplicate declaration

// router.post('/generate-report', async (req: { body: { title: any; data: any; }; }, res: { setHeader: (arg0: string, arg1: string) => void; send: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
//     try {
//         const { title, data } = req.body; // Receive data from the client

//         const jsreportInstance = await jsreport.init();

//         const report = await jsreportInstance.render({
//             template: {
//                 content: fs.readFileSync('templates/reportTemplate.hbs', 'utf-8'),
//                 engine: 'handlebars',
//                 recipe: 'chrome-pdf'
//             },
//             data: { title, date: new Date().toLocaleDateString(), data }
//         });

//         res.setHeader('Content-Type', 'application/pdf');
//         res.send(report.content);
//     } catch (error) {
//         console.error('Error generating report:', error);
//         res.status(500).send('Failed to generate report');
//     } finally {
//         jsreport.close();
//     }
// });

export default router;
