- Use request to get web page
- PromisifyAll on request
- Do a promise.all to get all the web pages at the same time
- Could each fetch of web page and the parsing of it to get data be done asynchronously? SURELY YES!!


Test
- Use proxyquire to override data returned from web request
- Test to make sure element selection works correctly
- Test to ensure that totalling of the array of objects works correctly (that can be TDD'd surely)
- Test to ensure that correct object is built from data returned
