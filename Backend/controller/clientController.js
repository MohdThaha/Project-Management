const Role = require('../database/model/role');
const bcrypt = require('bcrypt');



const createRolesForOrganization = async (organizationId) => {
  try {
    
    // Check if the roles already exist for the organization
    const existingRoles = await Role.find({ organizationId:organizationId });
    
    if (existingRoles.length > 0) {
      console.log("Roles already exist for this organization.");
      return { success: true, message: "Roles already exist for this organization." };
    }

    // Create admin and staff roles
    const roles = [
      { organizationId, description: 'Admin',roleName: 'Admin', permissions: [
        //Customers
        "CustomersView","CustomersCreate","CustomersEdit","CustomersDelete",
        //Vendors
        "VendorsView","VendorsCreate","VendorsEdit","VendorsDelete",
        //Item
        "ItemView","ItemCreate","ItemEdit","ItemDelete",
        //Inventory Adjustments
        "InventoryAdjustmentsView","InventoryAdjustmentsCreate","InventoryAdjustmentsDelete",
        //Warehouses
        "WarehousesView","WarehousesCreate","WarehousesEdit","WarehousesDelete",
        //Price List
        "PriceListView","PriceListCreate","PriceListEdit","PriceListDelete",
        //Banking
        "BankingView","BankingCreate","BankingEdit","BankingDelete",
        //Invoices
        "InvoicesView","InvoicesCreate","InvoicesEdit","InvoicesDelete",
        //Customer Payments
        "CustomerPaymentsView","CustomerPaymentsCreate","CustomerPaymentsEdit","CustomerPaymentsDelete",
        //Quotes
        "QuotesView","QuotesCreate",'QuotesEdit',"QuotesDelete",
        //Delivery Challan
        "DeliveryChallanView","DeliveryChallanCreate","DeliveryChallanEdit","DeliveryChallanDelete",
        //Sales Orders
        "SalesOrdersView","SalesOrdersCreate","SalesOrdersEdit","SalesOrdersDelete",
        //Credit Notes
        "CreditNotesView","CreditNotesCreate","CreditNotesEdit","CreditNotesDelete",
        //Bills
        "BillsView","BillsCreate","BillsEdit",'BillsDelete',
        //Vendor Payments
        "VendorPaymentsView","VendorPaymentsCreate","VendorPaymentsEdit","VendorPaymentsDelete",
        //Expenses
        'ExpensesView',"ExpensesCreate",'ExpensesEdit','ExpensesDelete',
        //Purchase Orders
        'PurchaseOrdersView','PurchaseOrdersCreate','PurchaseOrdersEdit','PurchaseOrdersDelete',
        //Vendor Credits
        'VendorCreditsView','VendorCreditsCreate','VendorCreditsEdit','VendorCreditsDelete',
        //Chart of Accounts
        'ChartofAccountsView','ChartofAccountsCreate','ChartofAccountsEdit','ChartofAccountsDelete',
        //Journals
        'JournalsView','JournalsCreate','JournalsEdit','JournalsDelete',
        //Budget
        'BudgetView','BudgetCreate','BudgetEdit','BudgetDelete',
        //Tasks
        'TasksView','TasksCreate','TasksEdit','TasksDelete',
        //Projects
        'ProjectsView','ProjectsCreate','ProjectsEdit','ProjectsDelete',
        //GST 
        "GSTViewReturnDetails","GSTPushTransactions","GSTReconcileTransactions","GSTFileReturns",
        //Documents
        "DocumentsViewDocuments","DocumentsUploadDocuments","DocumentsDeleteDocuments","DocumentsManageFolder",
        //e-Way Bill
        "GenerateEWayBill","CancelEWayBill",
        //Settings
        "UpdateOrganizationProfile","Users","ExportData","GeneralPreferences","AccountantPreferences","Taxes","ProvideAccessToProtectedData","PaymentTerms","Templates","EmailTemplate","ReportingTags","ManageIntegration","Automation","IncomingWebhook",'Signal',
        //Dashboard
        "TotalPayables","TotalReceivables","CashFlow","IncomeAndExpenses","YourTopExpense","Projects","BankAndCreditCards","AccountWatchlist",

        //REPORT

        //Business Overview
        //Profit And Loss
        "ProfitAndLossView","ProfitAndLossExport","ProfitAndLossSchedule","ProfitAndLossShare",
        //Profit and Loss (Schedule III)
        "ProfitAndLossScheduleView","ProfitAndLossScheduleExport","ProfitAndLossScheduleSchedule","ProfitAndLossScheduleShare",
        //Horizontal Profit and Loss
        "HorizontalProfitAndLossView","HorizontalProfitAndLossExport","HorizontalProfitAndLossSchedule","HorizontalProfitAndLossShare",
        //Cash Flow Statement
        "CashFlowStatementView","CashFlowStatementExport","CashFlowStatementSchedule","CashFlowStatementShare",
        //Balance Sheet
        "BalanceSheetView","BalanceSheetExport","BalanceSheetSchedule","BalanceSheetShare",
        //Horizontal Balance Sheet
        "HorizontalBalanceSheetView","HorizontalBalanceSheetExport","HorizontalBalanceSheetSchedule","HorizontalBalanceSheetShare",
        //Balance Sheet (Schedule III)
        "BalanceSheetScheduleView","BalanceSheetScheduleExport","BalanceSheetScheduleSchedule","BalanceSheetScheduleShare",
        //Business Performance Ratios
        "BusinessPerformanceRatiosView","BusinessPerformanceRatiosExport","BusinessPerformanceRatiosSchedule","BusinessPerformanceRatiosShare",
        //Movement Of Equity
        "MovementOfEquityView","MovementOfEquityExport","MovementOfEquitySchedule","MovementOfEquityShare",
        
        
        //Sales
        //Sales by Customer
        "SalesByCustomerView","SalesByCustomerExport","SalesByCustomerSchedule","SalesByCustomerShare",
        //Sales by Item
        "SalesByItemView","SalesByItemExport","SalesByItemSchedule","SalesByItemShare",
        //Order Fulfillment By Item
        "OrderFulfillmentByItemView","OrderFulfillmentByItemExport","OrderFulfillmentByItemSchedule","OrderFulfillmentByItemShare",
        //Sales Return History
        "SalesReturnHistoryView","SalesReturnHistoryExport","SalesReturnHistorySchedule","SalesReturnHistoryShare",
        //Sales By Salesperson
        "SalesBySalespersonView","SalesBySalespersonExport","SalesBySalespersonSchedule","SalesBySalespersonShare",


        //Inventory
        //Inventory Summary Report
        "InventorySummaryReportView","InventorySummaryReportExport","InventorySummaryReportSchedule","InventorySummaryReportShare",
        //Committed Stock Details
        "CommittedStockDetailsView","CommittedStockDetailsExport","CommittedStockDetailsSchedule","CommittedStockDetailsShare",
        //Inventory Valuation Summary
        "InventoryValuationSummaryView","InventoryValuationSummaryExport","InventoryValuationSummarySchedule","InventoryValuationSummaryShare",
        //FIFO Cost Lot Tracking
        "FIFOCostLotTrackingView","FIFOCostLotTrackingExport","FIFOCostLotTrackingSchedule","FIFOCostLotTrackingShare",        
        //Inventory Aging Summary
        "InventoryAgingSummaryView","InventoryAgingSummaryExport","InventoryAgingSummarySchedule","InventoryAgingSummaryShare",
        //Product Sales Report
        "ProductSalesReportView","ProductSalesReportExport","ProductSalesReportSchedule","ProductSalesReportShare",
        //Product Purchase Report
        "ProductPurchaseReportView","ProductPurchaseReportExport","ProductPurchaseReportSchedule","ProductPurchaseReportShare",
        //Stock Summary Report
        "StockSummaryReportView","StockSummaryReportExport","StockSummaryReportSchedule","StockSummaryReportShare",
        //Landed Cost Summary
        "LandedCostSummaryView","LandedCostSummaryExport","LandedCostSummarySchedule","LandedCostSummaryShare",

        //Receivables
        //Customer Balances
        "CustomerBalancesView","CustomerBalancesExport", "CustomerBalancesSchedule", "CustomerBalancesShare",
        //A/R Aging Summary
        "ARAgingSummaryView","ARAgingSummaryExport","ARAgingSummarySchedule","ARAgingSummaryShare",
        //A/R Aging Details
        "ARAgingDetailsView","ARAgingDetailsExport","ARAgingDetailsSchedule","ARAgingDetailsShare",
        //Invoice Details
        "InvoiceDetailsView","InvoiceDetailsExport","InvoiceDetailsSchedule","InvoiceDetailsShare",
        //Retainer Invoice Details
        "RetainerInvoiceDetailsView","RetainerInvoiceDetailsExport","RetainerInvoiceDetailsSchedule","RetainerInvoiceDetailsShare",
        //Sales Order Details
        "SalesOrderDetailsView","SalesOrderDetailsExport","SalesOrderDetailsSchedule","SalesOrderDetailsShare",
        //Delivery Challan Details
        "DeliveryChallanDetailsView","DeliveryChallanDetailsExport","DeliveryChallanDetailsSchedule","DeliveryChallanDetailsShare",
        //Quote Details
        "QuoteDetailsView","QuoteDetailsExport","QuoteDetailsSchedule","QuoteDetailsShare",
        //Customer Balance Summary
        "CustomerBalanceSummaryView","CustomerBalanceSummaryExport","CustomerBalanceSummarySchedule","CustomerBalanceSummaryShare",
        //Receivable Summary
        "ReceivableSummaryView","ReceivableSummaryExport","ReceivableSummarySchedule","ReceivableSummaryShare",
        //Receivable Details
        "ReceivableDetailsView","ReceivableDetailsExport","ReceivableDetailsSchedule","ReceivableDetailsShare",

        
        
        //Payments Received
        //Payments Received
        "PaymentsReceivedView","PaymentsReceivedExport","PaymentsReceivedSchedule","PaymentsReceivedShare",
        //Time Taken to Get Paid
        "TimeTakenToGetPaidView","TimeTakenToGetPaidExport","TimeTakenToGetPaidSchedule","TimeTakenToGetPaidShare",
        //Credit Notes Details
        "CreditNotesDetailsView","CreditNotesDetailsExport","CreditNotesDetailsSchedule","CreditNotesDetailsShare",
        //Refund History
        "RefundHistoryView","RefundHistoryExport","RefundHistorySchedule","RefundHistoryShare",


        //Recurring Invoices
        //Recurring Invoice Details
        "RecurringInvoiceDetailsView","RecurringInvoiceDetailsExport","RecurringInvoiceDetailsSchedule","RecurringInvoiceDetailsShare",
        // Recurring Invoice - Payment Failure Report
        "RecurringInvoicePaymentFailureReportView","RecurringInvoicePaymentFailureReportExport","RecurringInvoicePaymentFailureReportSchedule","RecurringInvoicePaymentFailureReportShare",
        // Recurring Invoice - Payment Retry Report
        "RecurringInvoicePaymentRetryReportView","RecurringInvoicePaymentRetryReportExport","RecurringInvoicePaymentRetryReportSchedule","RecurringInvoicePaymentRetryReportShare",
        // Recurring Invoice - Card Expiry Report
        "RecurringInvoiceCardExpiryReportView","RecurringInvoiceCardExpiryReportExport","RecurringInvoiceCardExpiryReportSchedule","RecurringInvoiceCardExpiryReportShare"





        ] },
      { organizationId, description: 'Staff',roleName: 'Staff', permissions: [
        //Customers
        "CustomersView","CustomersCreate","CustomersEdit","CustomersDelete",
        //Vendors
        "VendorsView","VendorsCreate","VendorsEdit","VendorsDelete",
        //Item
        "ItemView","ItemCreate","ItemEdit","ItemDelete",
        //Inventory Adjustments
        "InventoryAdjustmentsView","InventoryAdjustmentsCreate","InventoryAdjustmentsDelete",
        //Price List
        "PriceListView","PriceListCreate","PriceListEdit","PriceListDelete",
        //Banking
        "BankingView","BankingCreate","BankingEdit","BankingDelete",
        //Invoices
        "InvoicesView","InvoicesCreate","InvoicesEdit","InvoicesDelete",
        //Customer Payments
        "CustomerPaymentsView","CustomerPaymentsCreate","CustomerPaymentsEdit","CustomerPaymentsDelete",
        //Quotes
        "QuotesView","QuotesCreate",'QuotesEdit',"QuotesDelete",
        //Delivery Challan
        "DeliveryChallanView","DeliveryChallanCreate","DeliveryChallanEdit","DeliveryChallanDelete",
        //Sales Orders
        "SalesOrdersView","SalesOrdersCreate","SalesOrdersEdit","SalesOrdersDelete",
        //Credit Notes
        "CreditNotesView","CreditNotesCreate","CreditNotesEdit","CreditNotesDelete",
        //Bills
        "BillsView","BillsCreate","BillsEdit",'BillsDelete',
        //Vendor Payments
        "VendorPaymentsView","VendorPaymentsCreate","VendorPaymentsEdit","VendorPaymentsDelete",
        //Expenses
        'ExpensesView',"ExpensesCreate",'ExpensesEdit','ExpensesDelete',
        //Purchase Orders
        'PurchaseOrdersView','PurchaseOrdersCreate','PurchaseOrdersEdit','PurchaseOrdersDelete',
        //Vendor Credits
        'VendorCreditsView','VendorCreditsCreate','VendorCreditsEdit','VendorCreditsDelete',        
        //Projects
        'ProjectsView',
        //Documents
        "DocumentsViewDocuments","DocumentsUploadDocuments","DocumentsDeleteDocuments","DocumentsManageFolder"
      ] }
    ];

    await Role.insertMany(roles);
    console.log("Roles created successfully for organization:", organizationId);
    return { success: true, message: "Roles created successfully." };

  } catch (error) {
    console.error("Error creating roles:", error);
    return { success: false, message: "Failed to create roles." };
  }
};






// Create New Client, Organization, Prefix, Role
exports.createOrganizationAndClient = async (req, res) => {
  console.log("Create Organization and Client:", req.body);
  try {
    const {
      organizationName,
      contactName,
      contactNum,
      email,
      password,
      // Add other fields as needed
    } = req.body;

    // Check if an organization with the same organizationName already exists
    const existingOrganization = await Organization.findOne({ organizationName });

    if (existingOrganization) {
      return res.status(409).json({
        message: "Organization with the provided name already exists.",
      });
    }

    // Count existing organizations to generate the next organizationId
    const organizationCount = await Organization.countDocuments({});
    const nextIdNumber = organizationCount + 1;
    const organizationId = `INDORG${nextIdNumber.toString().padStart(4, '0')}`;

    // Create a new organization
    const newOrganization = new Organization({
      organizationId,
      organizationName,
      primaryContactName: contactName,
      primaryContactNum: contactNum,
    });

    let savedOrganization = await newOrganization.save();

    if (!savedOrganization) {
      console.error("Organization could not be saved.");
      return res.status(500).json({ message: "Failed to create organization." });
    }

    // Create roles for the organization
    const roleCreationResult = await createRolesForOrganization(organizationId);

    if (!roleCreationResult.success) {
      return res.status(500).json({ message: roleCreationResult.message });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new client
    const newClient = new Client({
      organizationName,
      organizationId,
      contactName,
      contactNum,
      email,
      // Add other fields as needed
    });

    const savedClient = await newClient.save();

    if (!savedClient) {
      console.error("Client could not be saved.");
      return res.status(500).json({ message: "Failed to create client." });
    }

    // Create a new user
    const newUser = new User({
      organizationName,
      organizationId,
      userName: contactName,
      userNum: contactNum,
      useremail: email,
      password: hashedPassword,
      role: 'Admin',
      // Add other fields as needed
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      console.error("User could not be saved.");
      return res.status(500).json({ message: "Failed to create user." });
    }


  
      const newPrefix = new Prefix({
        organizationId,

        journal:"JN-",
        journalNum:1,
        
        creditNote: "CN-",
        creditNoteNum: 1,
        
        customerPayment: 'CP-',
        customerPaymentNum: 1,

        purchaseOrder: "PO-",
        purchaseOrderNum: 1,
        
        salesOrder: "SO-",
        salesOrderNum: 1,

        vendorPayment: "VP-",
        vendorPaymentNum: 1,

        retainerInvoice: "RET-",
        retainerInvoiceNum: 1,

        vendorCredits: "DN-",
        vendorCreditsNum: 1,

        billOfSupply: "BOS-",
        billOfSupplyNum: 1,

        debitNote: "CDN-",
        debitNoteNum: 1,

        invoice:"INV-",
        invoiceNum: 1,

        quote: "QT-",
        quoteNum: 1,
        
        deliveryChallan: "DC-",
        deliveryChallanNum: 1,
      });

  
      const savedPrefix = await newPrefix.save();
  
      if (!savedPrefix) {
        console.error("Prefix could not be saved.");
        return res.status(500).json({ message: "Failed to create Prefix." });
      }
      
    

    res.status(201).json({
      message: "Organization, Prefix, Client, and User created successfully.",
      organizationId: organizationId,
    });
    console.log("Organization, Client, and User created successfully:", { organizationId });
  } catch (error) {
    console.error("Error creating Organization, Client, and User:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



// Flush DB
exports.deleteAll = async (req, res) => {
  try {
    await Organization.deleteMany({});
    console.log("Organization data deleted.");

    await Client.deleteMany({});
    console.log("Client data deleted.");

    await User.deleteMany({});
    console.log("User data deleted.");

    await Prefix.deleteMany({});
    console.log("Prefix data deleted.");

    await Account.deleteMany({});
    console.log("Account data deleted.");

    await Journal.deleteMany({});
    console.log("Journal data deleted.");

    await TrialBalance.deleteMany({});
    console.log("Trial Balance data deleted.");

    await Role.deleteMany({});
    console.log("Role data deleted.");


    res.status(200).json("Database Flushed Successfully");

  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};



