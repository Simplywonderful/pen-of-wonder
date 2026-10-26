---
title: "Quantitative data analysis: best practice and common mistakes"
summary: The core approaches in quantitative analysis, the habits that make an analysis trustworthy, and four mistakes that quietly undermine results.
sourceDates:
  first: 2024-05-08
  last: 2024-05-13
sourcePosts: [38, 39, 40]
series: guide
serviceLink: /coaching
serviceLine: If you’re learning to run your own analysis in SPSS, we offer one-to-one tutoring where you work on your data and we guide you through choosing, running and reporting the tests.
draft: false
publishDate: 2024-05-13
---

Numbers can tell stories, but only if you know how to read them. As a researcher you will often face a spreadsheet full of figures and the question of what, if anything, they show. Quantitative data analysis is how you find the patterns, trends and relationships in that data, and how you tell real findings from noise.

This guide covers the main approaches, the habits that make an analysis trustworthy, and the mistakes that quietly undermine results.

## What quantitative data analysis is

Quantitative data analysis is the systematic process of organising, summarising and analysing numerical data to answer a research question. Its goal is conclusions that are supported by the evidence, and honest about what the evidence can’t show.

## Part 1: The main approaches

### Descriptive statistics

Descriptive statistics are the bread and butter of quantitative analysis. They summarise your data’s central tendency (mean, median, mode), its spread (range, standard deviation, variance) and its distribution.

Always start here. Before any complex test, describe your data. You will understand it better, and you will often spot problems, such as impossible values or very skewed distributions, that would distort later tests.

**Example:** in a study of student performance, descriptive statistics would show the average exam score, how widely scores varied, and whether a few very low scores were pulling the mean down.

### Inferential statistics

Inferential statistics let you draw conclusions about a population from a sample. They include estimating population values, testing hypotheses and judging whether the differences or relationships you see are likely to be real or could have arisen by chance.

Common procedures include t-tests, analysis of variance (ANOVA), chi-square tests, correlation and regression.

**Example:** in a study comparing two teaching methods, an inferential test tells you whether the difference in students’ scores is larger than you would expect from chance alone. Report the size of the difference with a confidence interval, not just the p-value: a statistically significant difference can still be too small to matter.

### Data visualisation

Visualisation helps you explore your data and communicate what you found. Scatter plots, bar charts, line graphs and histograms each show different things: relationships, comparisons, change over time, distributions.

**Example:** when researching customer preferences across product categories, a bar chart shows the distribution more clearly than a pie chart, because readers judge lengths along a common scale more accurately than angles (Cleveland & McGill, 1984).

### Quantitative content analysis

Quantitative content analysis applies counting and statistics to text or images. You build a coding scheme, apply it systematically, and analyse the counts. It is common in media, communication and marketing research.

**Example:** in a study of how newspapers cover environmental issues, you might code articles for topic and tone, then measure how coverage changed over time.

## Part 2: Habits of a trustworthy analysis

### Begin with clear objectives

Know your research questions before you open the data. What exactly do you want to find out? Clear objectives keep you focused on the variables and relationships that matter, and protect you from wandering through the data until something looks interesting.

**Example:** in a customer satisfaction study, your objectives might be to identify which factors predict satisfaction, and where products or services most need improvement.

### Check the quality of your data

You may have heard “garbage in, garbage out”. Your analysis can only be as good as your data. Before analysing, check that the data are accurate, complete and consistent.

That usually means cleaning: correcting entry errors, dealing with inconsistencies, and deciding how to handle missing values. Look for outliers and decide, with a reason you can report, whether they are errors or genuine extreme values. Keep a record of every change you make, and never delete a response simply because it doesn’t fit your expectations.

**Example:** in an employee satisfaction survey, you might find responses where the same person ticked “very satisfied” and “very dissatisfied” for the same question. Decide on a rule for such cases before you look at the results, apply it consistently, and report it.

### Choose the right technique

Not every method suits every question. Choose your analysis according to:

- your research question (are you comparing groups, looking for relationships, or predicting an outcome?);
- the level of measurement of your variables (nominal, ordinal, interval or ratio);
- the assumptions each technique makes about your data.

**Example:** to measure the strength and direction of a relationship between two continuous variables, you might use a correlation. If the data are ordinal or badly skewed, a rank-based correlation such as Spearman’s may be more appropriate than Pearson’s.

### Interpret and communicate clearly

Running the test is only the first step. Interpret what the results mean for your question, for existing theory and for practice, and be clear about their limits.

When you write up, use plain language and explain technical terms. Report the statistics your field expects (usually the test statistic, degrees of freedom, p-value, effect size and confidence interval), and use tables and graphs to show the main findings.

**Example:** when presenting to a non-technical audience, a simple bar chart showing how groups differed, with a one-sentence explanation, will do more than a table of coefficients.

## Part 3: Four common mistakes

### 1. Ignoring the assumptions of your tests

Every statistical test makes assumptions. If they don’t hold, the results may be misleading.

**Example:** linear regression assumes, among other things, a linear relationship, normally distributed residuals and constant variance of residuals (homoscedasticity). Check these with residual plots before you trust the output. In SPSS, the regression dialogue can save residuals and produce the plots you need.

### 2. P-hacking and data dredging

P-hacking, also called data dredging, means running test after test, or trying different subsets and variables, until something comes out “significant”. It inflates the chance of false positives and makes results unreliable.

To guard against it, decide your hypotheses and analysis plan before you look at the results, and pre-register them where your field allows. Report every analysis you ran, including the ones that found nothing.

### 3. Treating correlation as causation

Correlation does not show causation, yet this is one of the most common errors in writing up quantitative results. Be careful with wording: “was associated with” is not the same as “caused”.

**Example:** ice cream sales and drowning deaths rise and fall together. Ice cream doesn’t cause drowning; hot weather increases both. Always ask what third variable could explain a relationship you have found, and whether your study design allows a causal claim at all.

### 4. Not checking whether results hold up

A result found once, in one sample, may not hold elsewhere. Where you can, check your findings: test them on a separate sample, use cross-validation for predictive models, or see whether they are consistent with similar studies. Be cautious about generalising beyond the population you sampled.

## In short

A trustworthy quantitative analysis starts with clear questions and clean data, uses tests that fit the data, checks their assumptions, and reports results honestly, including their limits. Avoid the four mistakes above and your findings will stand up to the scrutiny of supervisors, examiners and reviewers.

## Reference

Cleveland, W. S., & McGill, R. (1984). Graphical perception: Theory, experimentation, and application to the development of graphical methods. *Journal of the American Statistical Association, 79*(387), 531–554. https://doi.org/10.1080/01621459.1984.10478080
