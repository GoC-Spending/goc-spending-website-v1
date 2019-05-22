---
title: 'Download the data'
description: "Download links for the combined dataset of Government of Canada contract spending, in CSV format."
date: 2019-05-04
draft: false
menu: 
  main:
    parent: 'data'
---

# Download government contract spending data

A great way to understand the insights and limitations of this data is to download and analyze it yourself. The combined dataset includes the full set of contracting data from both the Proactive Disclosure websites and Open Government datasets. You can learn more about these on the [Methodology](/methodology/) page.

The combined dataset exists in four different formats. Each of these can be downloaded as a ZIP-compressed CSV file. You can choose the one that works best for your particular use-case.

## Downloads

### “Source” table

This table includes the raw data from both sources. It includes any duplicate or potentially erroneous entries (except any entries that could not be successfully imported into the database).

- [**Download source.zip**](https://s3-us-west-2.amazonaws.com/goc-spending-export-20190519/public/source.zip) (ZIP'd CSV file, 45.9 MB)

### “Source” table, with metadata

This table includes the raw data above, with a range of additional metadata columns whose fields were generated from the raw data (cleaned and normalized vendor names, effective start and end years, etc.). It includes columns that flag duplicate or erroneous entries. This table is a good place to start for conducting your own analysis.

- [**Download source_with_metadata.zip**](https://s3-us-west-2.amazonaws.com/goc-spending-export-20190519/public/source_with_metadata.zip) (ZIP'd CSV file, 64.4 MB)

### “Clean” table

This table includes the data from the “source” table, minus the duplicate and error-flagged rows. It includes the generated metadata described in the “source” table above.

- [**Download clean.zip**](https://s3-us-west-2.amazonaws.com/goc-spending-export-20190519/public/clean.zip) (ZIP'd CSV file, 29.0 MB)

### “By year” table

This table is generated from the “clean” table, and includes separate entries for each effective year (based on the [normalizing by year](/methodology#normalizing-by-year) method). Of the downloads listed, this table is the easiest way to do year-by-year analyses, based on the methodology used here.

- [**Download by_year.zip**](https://s3-us-west-2.amazonaws.com/goc-spending-export-20190519/public/by_year.zip) (ZIP'd CSV file, 23.9 MB)

## Original source data

### Proactive Disclosure websites

You can download the scraped HTML excerpts, or the parsed JSON files [generated from these excerpts](/methodology/) from the [goc-spending-data archive repository](https://github.com/GoC-Spending/goc-spending-data) on GitHub. 

This repository includes data from {{< vars totalScrapedProactiveDisclosureDepartments >}} Proactive Disclosure websites, {{< vars numberOfWebsitesNowOffline >}} of which are no longer available online. 

### Open Government dataset

The [Proactive Disclosure of Contracts dataset](https://open.canada.ca/data/en/dataset/d8f85d91-7dec-4fd1-8055-483b77225d8b) can be downloaded from the Open Government website. It is updated on a regular basis as new departmental data is added, even though the “Record Modified” metadata indicates that it was last modified on {{< vars openGovernmentDatasetRecordModifiedDate >}}.

The version of the Open Government dataset used to generate the combined dataset tables above is from {{< vars openGovernmentDatasetPointInTimeDate >}}. The [archived point-in-time version can be downloaded here](https://s3-us-west-2.amazonaws.com/goc-spending-export-20190519/public/2019-03-24-contracts.zip).

## Share your feedback!

If you have thoughts on the data downloads listed here, or if you create interesting analyses of your own, please [get in touch](/about/#get-in-touch)! 
