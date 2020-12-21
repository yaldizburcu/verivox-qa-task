const pageObjectList = {
    // Popup Cookie Accept
    PopupWindowCookie: '/html/body/div[4]',
    ButtonAccept: '/html/body/div[4]/div[4]/button[2]',

    //Tabs
    LinkDSLTab:'/html/body/div[2]/header/div[2]/div/nav/ul/li[4]',
    
    //Subtabs LinkDSLTab
    LinkSubTabsDSL:'/html/body/div[1]/main/div[1]/div/section/div[1]/div[1]',
    LinkSubTabInternetTelefon: 'mps-label-1',
    FieldAreaCode: '/html/body/div[1]/main/div[1]/div/section/div[1]/div[2]/form/div[3]/div[1]/input',
    Link100Mbit: '/html/body/div[1]/main/div[1]/div/section/div[1]/div[2]/form/div[3]/div[2]/label[3]',
    ButtonJetztVergleichen: '/html/body/div[1]/main/div[1]/div/section/div[1]/div[2]/form/div[3]/button',

    //TariffPage
    TextTitleTarifempfehlung: '/html/body/div[1]/main/div/vx-telco-broadband/div/app-tariff-list/div/div[2]/div[2]/div[1]/h1',
    TextTitleErmittelteTarife: '/html/body/div[1]/main/div/vx-telco-broadband/div/app-tariff-list/div/div[2]/div[2]/h1',

}

module.exports = pageObjectList;
