---
title: 'Methodology'
description: "Data sources and methodology used to produce the combined dataset of Government of Canada contract spending and aggregate trend analyses."
date: 2019-05-04
draft: false
menu: 
  main:
    parent: 'methodology'
---

# Methodology and sources

This [volunteer-led project](/about/) began in 2017 as an effort to better understand federal government contract spending at a government-wide level. The page below describes the data sources and methodology used to produce the combined dataset as well as the aggregate trends displayed on the Analysis page.

## Table of contents

{{< toc >}}

## Data sources

### Proactive disclosure websites

Data on federal government contract spending was sourced from each department’s [Proactive Disclosure](https://www.canada.ca/en/treasury-board-secretariat/services/reporting-government-spending/proactive-disclosure-department-agency.html) websites.

These websites listed contracts and amendments by the fiscal quarter in which the contract or amendment was initiated. Information for a given contract or amendment was displayed on an individual webpage. Examples of Proactive Disclosure websites include:

- **Canadian Space Agency:** [Index page](https://web.archive.org/web/20190506065704/http://www.asc-csa.gc.ca/eng/publications/contracts.asp), [sample contract entry](https://web.archive.org/web/20181201212217/http://www.asc-csa.gc.ca/eng/publications/contracts-details.asp?trimestre=51&id=11270)
- **Health Canada:** [Index page](https://web.archive.org/web/20170823132856/http://www.contracts-contrats.hc-sc.gc.ca/cfob/mssid/contractdisc.nsf/webGetbyperiod?OpenView&Count=1000&ExpandAll&lang=eng&), [sample contract entry](https://web.archive.org/web/20170824074700/http://www.contracts-contrats.hc-sc.gc.ca/cfob/mssid/contractdisc.nsf/WEBbypurpose/85669557737F4EC485257FA20050880D?OpenDocument&lang=eng&)
- **National Defence:** [Index page](https://web.archive.org/web/20190402220727/http://www.admfincs.forces.gc.ca/apps/dc/intro-eng.asp), [sample contract entry](https://web.archive.org/web/20190519200914/http://www.admfincs.forces.gc.ca/apps/dc/contract-contrat-eng.asp?q=2&y=2015&id=id203276)

These webpages would typically list:

- the name of the vendor
- a reference number
- the contract date (when it was recorded in the department’s financial system)
- the contract period (start and end), or a delivery date
- the total value of the contract
- a description of what work was requested



The contract value indicates the amount of money that the government **commits** to spending through the contract, rather than a transactional record of funds being spent at a given point in time. 

In many cases, these webpages would also include an original value for the contract, if it was different than the total or final value, or the additional value of the most recent amendment to it. Many of the webpages also included comments describing if the contract was (for example) sole-sourced, part of a standing offer list, or a correction to a previous contract entry. These comments were freeform text and weren’t written consistently from one entry to the next.

Although the structure of these webpages was similar from one department to the next, they were each created separately by each department. As a result, the HTML code of each proactive disclosure website was different enough that individual web scrapers had to be created for each department. {{< vars totalScrapedProactiveDisclosureDepartments >}} different web scrapers were created and used to retrieve departmental proactive disclosure website data.



### Open Government dataset

Beginning in 2016, departments began migrating their proactive disclosure information to a common dataset on the Open Government website (open.canada.ca).

This dataset is in a consistently structured CSV file that is updated on a regular basis with new data from departments. It includes the data elements above, along with a range of other fields (whether the contract involves a former public servant, commodity codes, standing offer numbers, the country of origin, etc.). Having this data collected in a consistent place makes it much easier to analyze at scale and across the federal government.

However, for most departments, this dataset only includes contract data going back to 2016. (A small number of departments provided historical data back as far as 2005 within the dataset, which is commendable.) Meanwhile, as departments began providing data via the Open Government dataset, they stopped updating their individual proactive disclosure webpages. This was often done in conjunction with the migration of departmental websites to Canada.ca. 

As a result, neither the Open Government dataset nor the individual departmental proactive disclosure websites provided a full historical overview of contract spending. This project was an effort to bring these together into a single, historically comprehensive dataset.

At least {{< vars numberOfWebsitesNowOffline >}} departments have taken their proactive disclosure websites offline since 2017 when this project began. For these departments, the [scraped data collected for this project](https://github.com/GoC-Spending/goc-spending-data) is likely the only publicly-available source of this data.

The Open Government dataset [can be downloaded here from open.canada.ca](https://open.canada.ca/data/en/dataset/d8f85d91-7dec-4fd1-8055-483b77225d8b). The point-in-time copy used for the aggregate trend analysis (from {{< vars openGovernmentDatasetPointInTimeDate >}}) is archived [here]. You can [download the combined dataset](/download/) to conduct further analyses on your own.

## Limitations and assumptions

### Limited departmental scope

The combined dataset includes data from {{< vars totalScrapedProactiveDisclosureDepartments >}} departments’ publicly-available Proactive Disclosure websites, and from {{< vars totalOpenGovernmentDatasetDepartments >}} departments or agencies represented in the Open Government dataset. 

Combined, this represents {{< vars totalIncludedDepartments >}} departments, {{< vars percentCoverageOfDepartments >}} of the {{< vars totalPolicySubjectedDepartments >}} departments and agencies that are subject to government Proactive Disclosure of contracts policies. It does not include crown corporations or federal museums, the House of Commons or Senate, or security agencies.

### Limited historical data

The time range of historical data varied from one department to another. Proactive Disclosure websites went back as far as 2005 for some departments, or only as far back as 2012 for others. Data from the Open Government dataset typically only went back as far as 2015 or 2016 (with some notable exceptions, including <abbr title="Canadian Environmental Assessment Agency">CEAA</abbr>, <abbr title="National Defence">DND</abbr>, <abbr title="Environment and Climate Change Canada">ECCC</abbr>, <abbr title="Employment and Social Development Canada">ESDC</abbr>, <abbr title="Global Affairs Canada">GAC</abbr>, <abbr title="Canadian Heritage">PCH</abbr>, <abbr title="Public Service Commission">PSC</abbr>, and <abbr title="Canada Revenue Agency">CRA</abbr> which provided comprehensive historical data going back to 2004 within the Open Government dataset). 

One consequence of this is that **year-by-year trends are likely to show an exaggerated increase in contract spending over time**. The perceived increase would be caused in part by more complete data as the year gets closer to the present.

Many of the largest departments (for example, PSPC and DND) include data as far back as at least 2007. As a result, we’ve used 2008 to 2017 (a ten-year time period) as the time range for any year-over-year trend analyses.

### Inconsistent date formats

In both data sources, formatting for dates was highly inconsistent (despite a [federal standard requiring the ISO 8601 date format](https://www.tbs-sct.gc.ca/pol/doc-eng.aspx?id=17284)). Some departments used `YYYY-MM-DD`; others used `YYYY-DD-MM`; others used `MM/DD/YYYY` or spelled out months in words. Departments occasionally used different date formats from one contract entry to the next, or from one date field to the next of the same contract entry.

In other cases, contract entries included more problematic dates. For example:

- `2006-09-31`
- `2012-31-03`
- `2012-00-30`
- `2005-19-15`
- `2015-30-30`
- `2015-02-1-22`
- `42033`
- `20156-03-31`
- `Incorrect data type for operator or @Function: Time/Date expected-ed-ed`

For many date entries, distinguishing months and days was not possible. The year was the most consistently-identifiable date (any four-digit number beginning with 19 or 20). As a result, start and end calendar years became the most reliable date available from contract entries. 

This differs, however, from Government of Canada financial systems that use an April 1 to March 31 fiscal year. As a result, comparing this data (aggregated by calendar year) to other government financial records (aggregated by fiscal year) is difficult.

Up to 2016, the Treasury Board Secretariat published [Purchasing Activity Reports](https://www.canada.ca/en/treasury-board-secretariat/corporate/reports/contracting-data.html) that detailed government spending by calendar year. 

The [2016 Purchasing Activity Report](https://www.canada.ca/en/treasury-board-secretariat/corporate/reports/contracting-data/2016-purchasing-activity-report.html) states a total of $18.2B in contract spending that year ($17B for contracts $25k and above, and $1.2B for contracts under $25k). This is comparable to {{< vars total2016ContractSpending >}} in [total 2016 contract spending](https://github.com/GoC-Spending/goc-spending-analysis/blob/master/general/effective-overall-total-by-year-2008-to-2017.csv) included in the combined dataset, which provides a useful gut-check. 

### Linearized year-to-year effective spending

Contract and amendment entries that spanned more than one year included the contract period (or start and end date) of the contract, as well as the total value. 

In practice, departments would have spent this money at different rates from one year to the next of a given contract (for example, spending a significant percentage of the total value early on in the contract for an initial deliverable, and less for continued maintenance in later years).

However, the data provided (by both initial contract and amendment entries) does not include year-by-year spending amounts. In order to model spending on a particular contract over several years, the total amount is evenly divided across each of the years of the contract. This assumes that the department spent the same amount each year of the contract (linear spending).

For contracts with amendments, the year-by-year rate was calculated separately for each amendment “segment” of the contract, such that the year-by-year totals of each segment would sum up to the final total value of the contract. This is described in more detail under the Contract Amendments section below.

## Steps

### Scraping and parsing proactive disclosure HTML

Custom [web scrapers for each department](https://github.com/GoC-Spending/goc-spending-laravel/tree/master/app/DepartmentHandlers) were written in PHP, using the [Guzzle](https://github.com/guzzle/guzzle) and [xpath-selector](https://github.com/stil/xpath-selector) libraries.

In most cases, departments used a very similar model for the structure of their Proactive Disclosure websites: a top-level index page listing fiscal quarters; a page for each fiscal quarter listing all the contracts from that time period; and a page for each contract with the complete contract details (described above).

Scraping contract data for a given department involved:

1. scraping the index page
1. storing the list of URLs for each fiscal quarter page
1. scraping each fiscal quarter page
1. storing the list of URLs for each contract page
1. scraping each contract page, saving the HTML of the main content to a file

Scraping and saving the contract pages’ HTML was done separately from parsing the HTML to identify actual data fields. This was done partly out of convenience (scraping was a slow process, and so parser functions could be written while the scraper was in progress) and partly to maintain a backup copy of departments’ contract pages. This was ultimately useful given that several departments shut down their Proactive Disclosure websites throughout the course of the project, as they began publishing via the Open Government dataset instead.

The saved HTML pages were parsed using Xpath selectors, to identify specific table cells and rows for each section (contract name, total value, delivery date, etc.). These were usually quite similar from one department to the next, but differed enough that separate parser functions or parameters were also needed each time. 

The parsed data was then stored in individual, consistently-structured JSON files for each contract page ([available on GitHub here](https://github.com/GoC-Spending/goc-spending-data)). Scraping an average department would result in thousands of JSON files, one for each contract or amendment. These were kept in separate, small files in order to avoid triggering the GitHub file size limit of 100MB. 

Finally, these JSON files were imported into a PostgreSQL database (via Laravel’s database functions) in order to be more easily analyzed, searched, and aggregated.

### Importing Open Government CSV data

Importing data from the Open Government CSV file was considerably easier than scraping and parsing departmental Proactive Disclosure webpages. Given the consistent structure of the data, only one set of functions was needed to import it (rather than a unique set for each department). 

These functions looped through each row of the CSV file, stored the data that matched the fields included on the Proactive Disclosure webpages, and then imported these to the same PostgreSQL database. 

### Basic error detection

For both data sources, a set of basic error checks were applied. Contracts without a source fiscal year or without a contract value (or one of $0) were flagged, to avoid including them in subsequent analyses or exports. CSV entries that didn’t include a departmental owner acronym, a vendor name, or a contract value were also flagged separately. 

### Vendor name normalization

The contracting data from both sources only provided a free-text vendor name field, without a business number or other official identifier. Matching together data from the same vendor was challenging as a result. Variations in vendor names could result from:

- Inconsistent spelling
- Legal suffixes (e.g. Ltd. or Inc.) inconsistently being included
- Abbreviations inconsistently being used
- Regional office names being included
- Company name changes occurring over time
- Joint ventures or partnerships
- Mergers and acquisitions

Normalizing vendor names included two steps. Vendor names were first “cleaned” to remove punctuation and special characters, as well as [any known legal suffixes](https://github.com/GoC-Spending/goc-spending-laravel/blob/master/app/VendorData.php#L17). 

Then, vendor names were manually matched together with their “parent” company, in a large matching table. **This [vendor matching table is available as a CSV file](https://github.com/GoC-Spending/goc-spending-vendors/blob/master/vendor_data.csv) and includes {{< vars vendorMatchingTableRows >}} rows.** It includes matching entries for the largest several hundred companies in the combined dataset, based on an early aggregate analysis of the data.

Because this matching was done by hand (looking up company names with similar keywords or character sequences in the database), it has a number of important limitations:

- Smaller companies are not included, and so their entries will not be associated together in aggregate analyses. 
- Joint ventures or partnerships are listed with only one of the participating companies (chosen arbitrarily, based on whichever manual database lookup was done first). 
- Resellers of another company’s products are sometimes merged with the original company, and sometimes included as standalone companies. 
- Companies with an identical name but working in different fields (for example, those based on common words like “Atmosphere”) are incorrectly merged together. 
- Companies with a wide range of subsidiary companies in different industries are merged as a single company, which makes it harder to do per-industry analyses (for example, telecommunications companies that also do IT systems integration, or defence companies that also provide temporary help services). 
- And, companies that changed names through mergers or acquisitions were normalized together when this was easily discoverable through cursory Google searches – which is to say, somewhat inconsistently.

### Date validation

As described above, inconsistent date formatting was an early challenge. Contract entries included some combination of the following set of dates: 

- Contract date (when the contract or amendment was registered in the department’s financial system), which was always included
- Delivery date (typical for goods, when it would be delivered to the department – functionally the end of the contract), or,
- Contract period, which included a start and end date (typical for services, the start and end of e.g. professional work)

Because inconsistent date formatting made it impossible to accurately determine months or dates, contract start and end dates were set to the closest year ([using a regular expression](https://github.com/GoC-Spending/goc-spending-laravel/blob/master/app/Helpers/Parsers.php#L158) that identified four-digit numbers beginning with 19 or 20, somewhere in the date text).

For contract and amendment entries that included a contract period, these start and end dates were used for the start and end years of the contract. If no contract period was specified, then the contract date was used for the start year, and the delivery date was used for the end year (in many cases, these were the same year). If only a contract date was specified, and no other dates, then this was assumed to be both the start and end year of the contract.

Inconsistent date formatting is a known issue to the Open Government team, which is [planning to fix dates in the CSV dataset](https://github.com/open-data/ckanext-canada/blob/contracts-changes/bin/migrate/migrate_contracts_2018_04.py) in the near future. 

### Duplicate entries

Because data was sourced from both the Proactive Disclosure websites and the Open Government dataset, it was important to find and remove duplicate entries (to avoid counting the same contracts or amendments more than once). This process also handled any duplicate entries that might have existed within each data sources.

Given the data quality limitations described above, three different methods of detecting duplicate entries were used:

1. Contracts with the same contract value, same normalized vendor name, and same (raw) contract date.
1. Contracts with the same contract value, same normalized vendor name, same reference number, and same (cleaned) start year. This handled any cases where the same contract or amendment was included more than once with the date formatted differently each time.
1. Contracts with the same contract value and the same reference number. This handled any cases where the both the date and the vendor name were formatted or written differently each time (and the raw vendor name wasn’t included in the vendor normalization table).

Given that the duplicate detection relied heavily on having the same contract value, it will have missed entries where the total contract value was written inconsistently. It likely also over-estimated entries that were not duplicates but that had the same vendor, start year, and total value – namely, contracts that were at the top of disclosure or sole-source financial thresholds (e.g. contracts with a value of exactly $10k or $25k).

### Detecting and grouping contract amendments

The source data did not have a consistent way of identifying amendments and linking them to their original contracts. In many (but not all cases), a free-text note in the “comments” field was included describing an entry as an amendment to a previous contract. These comments typically did not include more details or identifiers that would help users find the original contract, and were not in a machine-readable format.

Contract and amendment entries almost always included a reference number, which was the most promising method for linking amendments to each other and to the original contract entry. The amendment finding function found entries with the same normalized vendor name, the same reference number, the same start year, and a different contract value. It excluded entries that had been marked as duplicates by the methods above, as well as any entries flagged by the [basic error detection](#basic-error-detection) functions.

This process grouped related contract and amendments together using an “amendment group ID”, that could then be used to determine changes to the same contract over time. 

In some cases, departments would include variations to the reference number for subsequent amendments (e.g. adding a numerical suffix of some kind). These were not done in a consistent enough way to easily include them in the amendment finding function.

The amendment finding function restricted itself to one department at a time (to avoid false positives where contracts with coincidentally the same vendor, reference number, and value from different departments would have been matched together). As a result, this process may have excluded or miscounted any contract and amendment entries that were “handed off” from one department to another (e.g. from PSPC to SSC after its creation).

### Normalizing by year

Once contract and amendment entries were grouped together, it was possible to determine normalized per-year values over the lifetime of a contract. 

For contracts without amendments, this was straightforward: take the total value of the contract and divide it by the number of years it was in effect, to determine the value per year. (Because these contracts were [linearized by year](#linearized-year-to-year-effective-spending), they should be considered estimates rather than precise values.) For contracts that only spanned a single year, the per-year value is the same as the total value.

For contracts with amendments, the following steps were used:

- Sort the linked contract and amendment entries by source fiscal quarter in which they were published. This ensures that the most recent entry published by the department is the “canonical” one, used to determine the final contract value and the end year (if a long-term contract was shortened in a later amendment).
- Correct for any edge cases with inconsistent dates:
  - If the start year is later than the end year, set the end year to be the same as the start year.
  - If the start year of the most recent amendment is earlier than the original contract entry’s start year, use the start year of the most recent amendment.
- Create a list of years that span from the start year to the end year.
- Match each year to the contract or amendment entry that would have been in effect that year:
  - The earliest effective year is the start year of the original contract entry (the entry in the amendment group that was published first, by source fiscal quarter).
  - Subsequent years (if any) are associated with the original contract entry, up until the year in which an amendment was published (by source year), at which point that year and the years afterwards would be associated with the amendment entry instead of the original contract entry.
  - The same would be true for any subsequent amendments.
  - For the very last amendment entry, the effective start year would be year in which it was published (by source year) and the effective end year would be the end year listed in the amendment entry.

For example, imagine an amendment group with four entries:

- #1. Published: 2005. Start year: 2005. End year: 2009. Value: $10M.
- #2. Published: 2007. Start year: 2005. End year: 2011. Value: $10M.
- #3. Published: 2010. Start year: 2005. End year: 2011. Value: $15M.
- #4. Published: 2011. Start year: 2005. End year: 2015. Value: $20M.

The effective years would be as follows:

- 2005: #1.
- 2006: #1.
- 2007: #2.
- 2008: #2.
- 2009: #2.
- 2010: #3.
- 2011: #4.
- 2012: #4
- 2013: #4.
- 2014: #4.
- 2015: #4.

To calculate the effective contract value for each year, the steps below were used. The goal was to describe the contract value as accurately as possible for the time period of the contract or amendment in effect at the time. 

- For the first entry, calculate the effectively yearly value over the original start and end years of the contract. Then, store the per-year values for the years in which that entry was in effect (and not replaced by a subsequent amendment entry).
- For subsequent entries, calculate the effective yearly value over the source year and end years of the amendment entry, **minus the cumulative effective values of the previous entries**, then store those per-year values for the years in which the amendment was in effect.
- Do the same steps for any subsequent entries.

For the example above, the effective yearly values would be as follows:

- 2005: #1. Yearly value: $2M ($10M, over 2005-2009 or 5 years).
- 2006: #1. Yearly value: $2M.
- 2007: #2. Yearly value: $1.2M ($10M minus the $4M cumulative - values above, over 2007-2011 or 5 years). 
- 2008: #2. Yearly value: $1.2M.
- 2009: #2. Yearly value: $1.2M.
- 2010: #3. Yearly value: $3.7M ($15M minus the $7.6M cumulative - values above, over 2010-2011 or 2 years).
- 2011: #4. Yearly value: $1.74M ($20M minus the $11.3 cumulative - values above, over 2011-2015 or 5 years).
- 2012: #4. Yearly value: $1.74M.
- 2013: #4. Yearly value: $1.74M.
- 2014: #4. Yearly value: $1.74M.
- 2015: #4. Yearly value: $1.74M.

As this example shows, the effective yearly value changes with amendments to the contract. The total cumulative value should always equal the total value field listed in the most recent, “canonical” amendment entry. In this example, adding up the yearly value from each year equals the $20M total value listed in the last amendment entry.

As the example shows, if the time range of a contract is extended (by a subsequent amendment) without increasing the total contract value, then the effective per-year value decreases. In some cases, a subsequent amendment will include a contract value that is smaller than previous entries (if a contract was renegotiated to be smaller than originally planned) which can result in a negative yearly value. In all cases, the cumulative effective yearly values of a given group of matching contract and amendment entries should equal the total value of the most recent entry.

### Producing aggregate analysis trends

With amendment entries grouped together and effective yearly values calculated, it’s possible to produce aggregate totals on a per-year basis across, for example, a given department, a given company, or the government as a whole.

Given the [limited historical coverage](#limited-historical-data) of the data, these per-year trends become less accurate further back in time. One consequence of this is that the total effective values (e.g. total contract spending on a government-wide level) appear to increase more significantly than they do in practice, because the coverage of the data improves over time (namely, including data from more departments). For the [aggregated statistics](/analysis/) included here, a time range from 2008 to 2017 was chosen. 

To make it easier to produce aggregate statistics, two additional database tables were created and populated from the “source” table that contained the combined dataset:

- An initial “export” database table, that included all the entries from the combined dataset except for rows that were marked as duplicates or errors.
- A second “by year” database table, that created separate rows for each of the effective years of the contracts and amendment groups in the “export” database table. This table made it easier to do per-year analyses of the data.

You can [download these tables in CSV format](/download/).

Aggregate statistics were produced using simple SQL queries on these database tables:

- Statistics on the total number of contract or amendment entries were calculated from the “source” table. 
- Statistics on total effective (monetary) values over time were calculated from the “by year” table.

Results from the “by year” table on the largest overall vendors were used to improve the [vendor normalization table](#vendor-name-normalization), over several iterations.

A [class of analysis functions](https://github.com/GoC-Spending/goc-spending-laravel/blob/master/app/AnalysisOps.php) was used to perform database queries and export the results as CSV files. The [resulting analysis CSV files](https://github.com/GoC-Spending/goc-spending-analysis) are available on GitHub. These same queries are used to produce the charts on the [Analysis](/analysis/) page.

## Future improvements

### Natural language processing to normalize vendor names

The vendor normalization table was [created manually](#vendor-name-normalization), and based on the largest vendors in the dataset. There are {{< vars uniqueVendorNamesInCombinedDataset >}} unique vendor name entries in the combined dataset (or {{< vars uniqueCleanedVendorNamesInCombinedDataset >}} cleaned entries), and only {{< vars vendorMatchingTableRows >}} normalization entries included in the vendor normalization table. Natural language processing tools could be used to more effectively group together these entries, which would improve the aggregate statistics for the “long tail” of smaller vendors in particular.

### Automatic determination of vendor industry

At present, anyone interested in doing an industry-by-industry breakdown of contracts could be limited to manually grouping vendors by industry category.

It would be useful to be able to automatically determine the industry or industries of a given vendor, from outside data sources (company registries, Wikipedia, etc.). This would allow for government-wide aggregate statistics by industry, rather than just highlights of the largest vendors in a given industry.

### Contract-by-contract industry categorization, using object codes and machine learning

Aggregate statistics by industry are currently much easier to complete at the company by company level, rather than contract by contract. Being able to consistently determine the industry or nature of the work on a per-contract level would improve these per-industry statistics significantly. 

Many of the largest vendors contracting with the Canadian government provide services in a variety of fields, [as described above](#vendor-name-normalization). Being able to capture this at a more granular level would be beneficial.

Contract entries often include descriptions of work and, in some cases, object codes that could be used to automatically determine what industry a given contract falls within. 

### Improved date parsing and fiscal year (not calendar year) aggregate analysis

Given the date formatting and quality limitations, the effective year calculations above are done to the nearest calendar year. With improved date parsing (and some assumptions around month and day values), effective values could be determined by exact date rather than by year.

This would allow for aggregate statistics that map to government fiscal years, rather than just calendar years, which would be easier to compare to other government data sources.

### Better programming languages for data analysis

The bulk of the [scraping, parsing, and analysis code](https://github.com/GoC-Spending/goc-spending-laravel) for this project was written in [PHP](https://php.net/) using [Laravel](https://laravel.com/). 

Data science practitioners tend to use [Python](https://www.python.org/) or [R](https://www.r-project.org/) for similar projects, which provide access to a wide range of useful open-source data science tools. You can find some useful introductory resources here:

- [Data Analysis in Python](http://www.data-analysis-in-python.org/)
- [R for Data Science](https://r4ds.had.co.nz/)

You can [download the combined dataset in several formats](/download/) to perform your own analysis of the combined dataset. If you have questions about how this dataset was produced, or if you create interesting analyses of your own, please [get in touch](/about/#get-in-touch)! 



