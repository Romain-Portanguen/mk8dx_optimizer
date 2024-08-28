<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">MK8DX_OPTIMIZER</h1>
</p>
<p align="center">
    <em>Optimise your MK8DX performance</em>
</p>
<p align="center">
	<!-- Shields.io badges not used with skill icons. --><p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<a href="https://skillicons.dev">
		<img src="https://skillicons.dev/icons?i=react,ts&theme=light">
	</a></p>

<br><!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary><br>

- [Overview](#overview)
- [Features](#features)
- [Modules](#modules)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
</details>
<hr>

##  Overview

The mk8dx_optimizer is a sophisticated and robust web application designed to enhance gameplay for Mario Kart 8 Deluxe fans. It allows users to view driver and race profiles to calculate and display optimal kart configurations using advanced algorithms and information based on in-game data. The application incorporates a user-friendly interface with dynamic components for selecting and viewing vehicle components and overall performance statistics. Using advanced genetic algorithms and a robust scoring system, mk8dx_optimizer helps players make strategic decisions to maximise their in-game performance.

---

##  Features

|    | Feature          | Description                                                                                                    |
|----|------------------|----------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture** | Built with React and TypeScript, utilizes a component-based structure for UI and services for data management. |
| 🔩 | **Code Quality** | Code is modular and uses TypeScript for type safety. Follows modern JavaScript practices.                      |
| 🔌 | **Integrations** | Integrates with React libraries and Chart.js for data visualization. Uses Tailwind CSS for styling.            |
| 🧩 | **Modularity**   | High modularity with separation of concerns between UI components and data services.                           |
| 📦 | **Dependencies** | React, TypeScript, Tailwind CSS, Chart.js, Jest, React Testing Library, worker-loader.                         |
| 🚀 | **Scalability**  | Designed to be scalable in a frontend context with efficient components and services.                          |
```

---

##  Repository Structure

```sh
└── mk8dx_optimizer/
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── App.tsx
    │   ├── components
    │   ├── data
    │   ├── index.css
    │   ├── index.tsx
    │   ├── react-app-env.d.ts
    │   ├── services
    │   ├── types
    │   └── utils
    ├── tailwind.config.js
    └── tsconfig.json
```

---

##  Modules

<details closed><summary>src.types</summary>

| File                                                                                                                        | Summary                                                                                                                                                                                                                                                                                                              |
|-----------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [glider.types.ts](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/types/glider.types.ts)               | Defines the Glider interface within the mk8dx_optimizer project, specifying a structure for glider objects that includes a name and associated statistics. This interface is crucial for standardizing data handling across components that manage or display glider attributes in the application.                  |
| [body.types.ts](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/types/body.types.ts)                   | Defines the `Body` interface, central to the mk8dx_optimizers architecture, encapsulating vehicle body characteristics in Mario Kart 8 Deluxe, including names and associated statistics. This interface is crucial for data structuring across the application, ensuring consistent handling of vehicle attributes. |
| [driver.types.ts](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/types/driver.types.ts)               | Defines the structure for driver data within the mk8dx_optimizer project, linking driver names and abbreviations to their statistical profiles. This setup is essential for managing and accessing driver-specific statistics efficiently across the applications components and services.                           |
| [tire.types.ts](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/types/tire.types.ts)                   | Defines the Tire interface within the mk8dx_optimizer project, specifying the structure for tire data with properties for name, optional alternative name, and associated statistics, ensuring consistent data handling across components that manage or display tire information in the application.                |
| [configuration.types.ts](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/types/configuration.types.ts) | Defines the structure for a racing configuration in the MK8DX Optimizer, linking essential components such as body, driver, tire, and glider. This setup is crucial for ensuring that the application can effectively manage and utilize different racing configurations within its feature set.                     |
| [statistics.types.ts](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/types/statistics.types.ts)       | Defines a TypeScript interface for vehicle statistics in the MK8DX Optimizer, encompassing attributes like speed, handling, and invincibility across different terrains, crucial for optimizing character and vehicle selections based on performance metrics within the applications architecture.                  |

</details>

<details closed><summary>src.utils</summary>

| File                                                                                                                | Summary                                                                                                                                                                                                                                                                                                                                                  |
|---------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [ResultsDisplay.tsx](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/utils/ResultsDisplay.tsx) | ResultsDisplay.tsx provides a visual representation of optimal configurations in the mk8dx_optimizer project, displaying stats for vehicle components like body, tire, and glider using a clean, responsive UI with icons for enhanced user comprehension.                                                                                               |
| [StatsDisplay.tsx](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/utils/StatsDisplay.tsx)     | StatsDisplay.tsx provides a visual representation of statistical data through dynamic progress bars within the mk8dx_optimizer project, enhancing user interface by displaying component performance metrics. It utilizes a responsive design to adaptively showcase statistics, contributing to the overall usability and aesthetic of the application. |

</details>

<details closed><summary>src.components</summary>

| File                                                                                                                 | Summary                                                                                                                                                                                                                                                                                                                            |
|----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [CustomSelect.tsx](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/components/CustomSelect.tsx) | CustomSelect.tsx defines a reusable dropdown component, enhancing user interaction by allowing selection from dynamically provided options. It integrates accessibility features and UI responsiveness, crucial for maintaining consistent design and functionality across the mk8dx_optimizer applications frontend architecture. |

</details>

<details closed><summary>src.services</summary>

| File                                                                                                                                             | Summary                                                                                                                                                                                                                                                                                                                                      |
|--------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [configuration-scorer.ts](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/services/configuration-scorer.ts)                 | Calculates and caches scores for different racing configurations in the MK8DX Optimizer app, adjusting for driver stats, vehicle components, and race profiles. It employs a sophisticated scoring system that considers individual and combined performance metrics, maximizing strategic gameplay decisions based on statistical analysis. |
| [optimal-configuration-finder.ts](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/services/optimal-configuration-finder.ts) | OptimalConfigurationFinder in mk8dx_optimizer leverages genetic algorithms to determine the best vehicle configurations for Mario Kart 8 Deluxe, based on driver characteristics and race profiles. It dynamically adapts mutation rates and employs intelligent resets to optimize performance across generations.                          |
| [json-data-repository.ts](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/services/json-data-repository.ts)                 | JsonDataRepository serves as a centralized data access layer within the mk8dx_optimizer repository, managing and providing access to game-related assets like drivers, bodies, tires, and gliders, ensuring efficient data retrieval and encapsulation consistent with the repositorys architecture for optimizing game configurations.      |

</details>

<details closed><summary>src.services.interfaces</summary>

| File                                                                                                                                                                    | Summary                                                                                                                                                                                                                                                                                                        |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [data-repository.requirements.ts](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/services/interfaces/data-repository.requirements.ts)             | Defines the IDataRepository interface essential for accessing Mario Kart 8 Deluxe vehicle components like drivers, bodies, tires, and gliders within the application, ensuring standardized data retrieval methods across the mk8dx_optimizer projects architecture.                                           |
| [configuration-scrorer.requirements.ts](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/master/src/services/interfaces/configuration-scrorer.requirements.ts) | Defines the IConfigurationScorer interface, central to evaluating and scoring racing configurations based on driver and vehicle attributes within the mk8dx_optimizer project. It includes methods for calculating a configurations score and determining the maximum possible score for a given race profile. |

</details>

---

##  Getting Started

**System Requirements:**

* **TypeScript**: `version x.y.z`

###  Installation

<h4>From <code>source</code></h4>

> 1. Clone the mk8dx_optimizer repository:
>
> ```console
> $ git clone https://github.com/Romain-Portanguen/mk8dx_optimizer
> ```
>
> 2. Change to the project directory:
> ```console
> $ cd mk8dx_optimizer
> ```
>
> 3. Install the dependencies:
> ```console
> $ npm install
> ```

###  Usage

<h4>From <code>source</code></h4>

> Run mk8dx_optimizer using the command below:
> ```console
> $ npm start
> ```

---
##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/Romain-Portanguen/mk8dx_optimizer/issues)**: Submit bugs found or log feature requests for the `mk8dx_optimizer` project.
- **[Submit Pull Requests](https://github.com/Romain-Portanguen/mk8dx_optimizer/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/Romain-Portanguen/mk8dx_optimizer/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/Romain-Portanguen/mk8dx_optimizer
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com{/Romain-Portanguen/mk8dx_optimizer/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Romain-Portanguen/mk8dx_optimizer">
   </a>
</p>
</details>

---

##  License

This project is protected under the [MIT](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---
