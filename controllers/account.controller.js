const { accountService } = require('../service');

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await accountService.fetchAll({ query: req?.query })
        res.status(200).json({accounts, message: "Got required accounts" })
    }
    catch (error) {
        res.status(error?.code || 500).json({ message: error?.message });
    }
}

exports.getAccount = async (req, res) => {
    try {
        const account = await accountService.fetch({ params: req?.params, userId : req?.user?.id });
        res.status(200).json({ account, message: "Fetched account details" });
    }
    catch (error) {
        res.status(error?.code || 500).json({ message: error?.message });
    }
}

exports.addAccount = async (req, res) => {
    try {
        const account = await accountService.createAccount({ data: req?.body });
        res.status(200).json({ account, message: "Account created" });
    }
    catch (error) {
        res.status(error?.code || 500).json({ message: error?.message });
    }
}

exports.updateAccount = async (req, res) => {
    try {
        const account = await accountService.updateAccount({ data: req?.body, userId : req?.user?.id });
        res.status(200).json({ account, message: "Account details updated" });
    }
    catch (error) {
        res.status(error?.code || 500).json({ message: error?.message });
    }
}

exports.removeAccount = async (req, res) => {
    try {
        const account = await accountService.deleteAccount({ userId: req?.user?.id });
        res.status(200).json({ message: "Account Deleted Successfully" });
    }
    catch (error) {
        res.status(error?.code || 500).json({ message: error?.message });
    }
}