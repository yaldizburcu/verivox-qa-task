const pageObjectList = {
    // Popup Cookie Accept
    PopupWindowCookie: '//div[@class="cmp-container first-load first-view"]',
    ButtonAccept: '//div[@class="cmp-container first-load first-view"]//button[@class="gdpr-button gdpr-accept-all first-layer"]',

    //Tabs
    LinkDSLTab:'/html/body/div[2]/header/div[2]/div/nav/ul/li[4]',
    
    //Subtabs LinkDSLTab
    LinkSubTabsDSL:'/html/body/div[1]/main/div[1]/div/section/div[1]/div[1]',
    LinkSubTabInternetTelefon: 'mps-label-1',
    FieldAreaCode: '/html/body/div[1]/main/div[1]/div/section/div[1]/div[2]/form/div[3]/div[1]/input',
    Link100Mbit: '/html/body/div[1]/main/div[1]/div/section/div[1]/div[2]/form/div[3]/div[2]/label[3]',
    ButtonJetztVergleichen: '/html/body/div[1]/main/div[1]/div/section/div[1]/div[2]/form/div[3]/button',

    //TariffPage
    TextTitleTarifempfehlung: '//div//div//div/div/div//h1[@class="pt-xl-4 pt-2 pt-xl-0 text-center text-xl-left"]',
    TextTitleErmittelteTarife: '/html/body/div[1]/main/div/vx-telco-broadband/div/app-tariff-list/div/div[2]/div[2]/h1',
    ListTariff: '//div[@class="row my-4"]',
    LinkSelection100Mbit: '//app-tariff-speed[@class="d-block w-100"]/div[@class="d-flex internet-speed internet-speed-download"]/div[@class="internet-speed-literal col px-0"]/b[@class="pl-2"]',
    TextErmittelteTarifeCount: '//h2[@class="summary-tariff"]',
    ButtonWeitereLaden: '//div[@class="col-12 text-center"]//button[@class="btn btn-primary text-uppercase"]',
    //maps to the numbers of the tariffs under ErmittelteTarife section - it should change dependent on the total tariffs
    TextValueTariffCountNumber: '//div[@class="col-sm comparison-rank font-weight-bold ml-md-1"]',
    TextFieldBottom: '//div[contains(@class,"row my-4")]//app-calculation-disclaimer',
    FieldFooter: '//div//div[contains(@class,"page-disclaimer-footer")]',
    TextTariffNamesList: '//*[@class="headline-short-name px-sm-2 pt-sm-2"]',
    TextFeeList:'//div[@class="position-relative large mb-2"]//strong',
    ButtonZumAngebotList: '//div//div//div//a[@class="button-primary w-100"]',

}

module.exports = pageObjectList;
