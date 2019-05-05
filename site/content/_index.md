---
title: 'Home'
date: 2019-05-04
draft: false
menu: 
  main:
    parent: 'home'
---

# Analyzing GoC Contract Spending

This website is a volunteer-run analysis of Government of Canada contract spending. The federal government spends more than $X each year in competitive or sole-sourced contracts.

Since the mid-2000s, contracts larger than $10,000 have been published on each department’s [Proactive Disclosure](https://www.canada.ca/en/treasury-board-secretariat/services/reporting-government-spending/proactive-disclosure-department-agency.html) websites. Publishing contracting information is intended to improve transparency and public trust in government contracting and spending decisions.

Although departments have published contracting data for more than a decade, the format in which it was published – on individual departmental webpages for each contract or amendment – made it difficult to analyze at scale. 

Since 2016, departments have begun [publishing contracting data on the Open Government website](https://open.canada.ca/data/en/dataset/d8f85d91-7dec-4fd1-8055-483b77225d8b) in a government-wide CSV dataset. This dataset is much easier to analyze, but does not include historical data for most departments.

In order to build a government-wide, historical dataset of Government of Canada contract spending, volunteers from Ottawa Civic Tech built [a collection of website scrapers and other analysis tools](https://github.com/GoC-Spending/). These tools collected data from %totalIncludedDepartments% departmental websites and the Open Government dataset, merged it together, detected duplicate entries, matched sets of contract amendments together, and calculated aggregate statistics.

[sample government-wide chart here, e.g. total contract/amendment entries by fiscal quarter]

The resulting dataset is the first volunteer-led, public, historical analysis of Canadian federal government contract spending at a whole-of-government level. [Learn more about the methodology and data](/methodology), [review the initial analysis and trends](/analysis), or [download the data](/download) to identify insights of your own.

