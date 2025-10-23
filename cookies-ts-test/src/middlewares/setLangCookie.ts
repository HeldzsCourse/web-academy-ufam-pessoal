const setLangCookie = (req: any, res: any, next: any) => {
    if (!('lang' in req.cookies)) res.cookie('lang', 'pt-BR');
    next();
}

export default setLangCookie