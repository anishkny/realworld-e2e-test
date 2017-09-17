# RealWorld E2E Test

End-to-end testing example for a [RealWorld](realworld.io) [AngularJS](https://github.com/gothinkster/angularjs-realworld-example-app)/[NodeJS](https://github.com/gothinkster/node-express-realworld-example-app) stack using [Chrome Puppeteer](https://github.com/GoogleChrome/puppeteer).

## Getting Started

### Prerequisites

```
Docker CE 17+ (for Mongo)
Node 7+ (for Puppeteer)
Yarn
```

### Installing

Pull MongoDB image and run it
```
docker pull mongo
docker run -p 27017:27017 mongo
```

Install dependencies and start the app aka system under test (SUT)
```
yarn
yarn run start
```
This step will start the backend server at port 3000 and frontend static server at port 4000. If all went well, you can navigate your browser to: http://localhost:4000/

## Running the tests

```
yarn test
```

<!---
Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
--->
