const selectedTariffDetails ={
    TextTariffName: '//div[@class="tariff-details"]//h3[@class="group-header"]',
    ButtonList5MinutenWecheln:'//a[@class="responsive-label-txt offer-page-cta"]', //2 items
    TextListDurchPreise: '//div[@class="centered-content effective-price-wrapper"]//div[@class="price"]', //2 items
    TextDurchschnittpreis: '//tr[@class="average-price"]//td[@class="average-price-naming cost-name"]/span',
    TextDurchschnittpreisValue: '//tr[@class="average-price"]//td[@colspan="2"]',
    ModuleHardwareList: '//div[@class="subtab-hardware"]//div[@class="group"]//ul[@class="tariff-option-list"]//child::li', //list of hw items
    ListTextTariffs: '//table[@class="costs-table"]//tr[@class="cost-category"]/td[1]', // Hardware,Vorteile, Optionen
    TextTariffKosten: '//table[@class="costs-table"]//tr//child::th', //get first element

}

module.exports = selectedTariffDetails;