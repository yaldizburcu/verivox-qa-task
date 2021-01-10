# verivox-qa-task
QA task for Verivox
This test framework contains the functions and test case scenarios required for automation. This framework does not contain 
* An implementation that can run on both Linux/macOS and Windows.
* Implementations that can pass when executed for different browser engines.

During the creation of the framework and implementation of test cases Cucumber, Gherkin, NodeJS and Selenium are used. 
Visual Studio Code is used as IDE. The implemented test cases can only be executed via chrome browser.

First, unzip the file.

To compile the scenario, you should first be under verivox-qa-task directory and from terminal

npm install

command should be called to install package.json.

And assuming chromedriver.exe was put under node_modules/.bin directory and chromedriver was added as environment variable to PATH attribute.

After package.json is installed successfully, the test cases will be executed via below command:

npm test

At the end of the test execution, the test report will be reached via clicking on the suggested link starting with "https://reports.cucumber.io/reports/"