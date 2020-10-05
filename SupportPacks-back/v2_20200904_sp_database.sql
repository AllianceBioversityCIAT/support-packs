
--
-- Table structure for table `sp_apps`
--
DROP TABLE IF EXISTS `sp_apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_apps` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_apps`
--
LOCK TABLES `sp_apps` WRITE;
/*!40000 ALTER TABLE `sp_apps` DISABLE KEYS */
;
INSERT INTO `sp_apps`
VALUES (0, 'Data Management Support Pack'),
(1, 'M&E Support Pack');
/*!40000 ALTER TABLE `sp_apps` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `sp_categories`
--
DROP TABLE IF EXISTS `sp_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `app_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sp_categories_sp_apps_idx1` (`app_id`),
  CONSTRAINT `fk_categories_app` FOREIGN KEY (`app_id`) REFERENCES `sp_apps` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_categories`
--
LOCK TABLES `sp_categories` WRITE;
/*!40000 ALTER TABLE `sp_categories` DISABLE KEYS */
;
INSERT INTO `sp_categories`
VALUES (0, 'Research Protocols',0),
(1, 'Policy Documents',0),
(2, 'Data Ownership and Authorship',0),
(3, 'Planning',0),
(4, 'Data & Document Store',0),
(5, 'Fieldwork',0),
(6, 'Managing Data',0),
(7, 'Metadata',0),
(8, ' Archiving & Sharing',0),
(9, 'Monitoring, Evaluation and Learning Basics',1),
(10, 'Theory of Change and Impact Pathways - Planning',1),
(11, 'Indicators',1),
(12, 'Baselines',1),
(13, 'Reflection Mechanisms',1),
(14, 'Reporting',1),
(15, 'Impact Assessment Studies and Evaluation',1),
(16, 'Monitoring, Evaluation and Learning Tools',1),
(17, 'Online Planning, Reporting and Management Information System',1),
(18, 'Overall references for suitable tools and their descriptions',1);
/*!40000 ALTER TABLE `sp_categories` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `sp_categories`
--
DROP TABLE IF EXISTS `sp_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `app_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sp_categories_sp_apps_idx1` (`app_id`),
  CONSTRAINT `fk_categories_app` FOREIGN KEY (`app_id`) REFERENCES `sp_apps` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_categories`
--
LOCK TABLES `sp_categories` WRITE;
/*!40000 ALTER TABLE `sp_categories` DISABLE KEYS */
;
INSERT INTO `sp_categories`
VALUES (0, 'Research Protocols',0),
(1, 'Policy Documents',0),
(2, 'Data Ownership and Authorship',0),
(3, 'Planning',0),
(4, 'Data & Document Store',0),
(5, 'Fieldwork',0),
(6, 'Managing Data',0),
(7, 'Metadata',0),
(8, ' Archiving & Sharing',0),
(9, 'Monitoring, Evaluation and Learning Basics',1),
(10, 'Theory of Change and Impact Pathways - Planning',1),
(11, 'Indicators',1),
(12, 'Baselines',1),
(13, 'Reflection Mechanisms',1),
(14, 'Reporting',1),
(15, 'Impact Assessment Studies and Evaluation',1),
(16, 'Monitoring, Evaluation and Learning Tools',1),
(17, 'Online Planning, Reporting and Management Information System',1),
(18, 'Overall references for suitable tools and their descriptions',1);
/*!40000 ALTER TABLE `sp_categories` ENABLE KEYS */
;
UNLOCK TABLES;


--
-- Table structure for table `sp_person`
--
DROP TABLE IF EXISTS `sp_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `registeredAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(75) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 26 DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_person`
--
LOCK TABLES `sp_person` WRITE;
/*!40000 ALTER TABLE `sp_person` DISABLE KEYS */
;
INSERT INTO `sp_person`
VALUES (
    1,
    'Anonymous',
    '  ',
    '2020-04-09 12:33:00',
    'f.elvira+spsapp@cgair.org'
  ),
(
    2,
    'Felipe',
    'Elvira',
    '2020-04-09 12:33:15',
    'f.elvira@cgiar.org'
  ),
(
    3,
    'Hector',
    'Tobon',
    '2020-04-09 12:33:25',
    'h.f.tobon@cgiar.org'
  );
/*!40000 ALTER TABLE `sp_person` ENABLE KEYS */
;
UNLOCK TABLES;



--
-- Table structure for table `sp_download`
--
DROP TABLE IF EXISTS `sp_download`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_download` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `institute` longtext NOT NULL,
  `intended_use` longtext NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `filter_type` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_sp_download_sp_person1_idx1` (`user_id`),
  CONSTRAINT `fk_download_person` FOREIGN KEY (`user_id`) REFERENCES `sp_person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 61 DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_download`
--
LOCK TABLES `sp_download` WRITE;
/*!40000 ALTER TABLE `sp_download` DISABLE KEYS */
;
INSERT INTO `sp_download`
VALUES (1, 2, 'CCAFS', 'Testing', '2018-06-29 20:30:28', 0),
(2, 2, 'CCAFS', 'Testing', '2018-06-29 20:30:29', 0),
(3, 2, 'MARLO', 'Testing', '2018-06-29 20:30:29', 0);
/*!40000 ALTER TABLE `sp_download` ENABLE KEYS */
;
UNLOCK TABLES;



--
-- Table structure for table `sp_guidelines`
--
DROP TABLE IF EXISTS `sp_guidelines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_guidelines` (
  `id` int(11) NOT NULL,
  `code` varchar(45) NOT NULL,
  `name` varchar(200) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `source` varchar(300) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `app_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sp_guidelines_sp_apps_idx1` (`app_id`),
  CONSTRAINT `fk_guidelines_app` FOREIGN KEY (`app_id`) REFERENCES `sp_apps` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_guidelines`
--
LOCK TABLES `sp_guidelines` WRITE;
/*!40000 ALTER TABLE `sp_guidelines` DISABLE KEYS */
;
INSERT INTO `sp_guidelines`
VALUES (
        1,
        '1.1.',
        'CGIAR Open Access & Data Management Policy',
        0,
        '1_Policy_Documents\\2013-10 CGIAR Open Access & Data Management Policy.pdf',
        1,
        0
    ),
    (
        2,
        '1.2.',
        'CGIAR Open Access & Data Management Implementation Guidelines',
        0,
        '1_Policy_Documents\\2014-07 CGIAR Open Access & Data Management Implementation Guidelines.pdf',
        0,
        0
    ),
    (
        3,
        '1.3.',
        'CGIAR Open Access-Open Data Implementation Plan Template',
        0,
        '1_Policy_Documents\\2015-05 CGIAR Open Access-Open Data Implementation Plan - Template.docx',
        0,
        0
    ),
    (
        4,
        '1.5',
        'CCAFS Data Management Strategy',
        0,
        '1_Policy_Documents\\2015-06 CCAFS Data Management Strategy.pdf',
        1,
        0
    ),
    (
        5,
        '0.1.',
        'Writing Research Protocols - a statistical perspective',
        0,
        'https://resources.stats4sd.org/resource/writing-research-protocols---a-statistical-perspective',
        1,
        0
    ),
    (
        6,
        '0.2.',
        'What is a research protocol and how to use one (Video)',
        1,
        'https://www.youtube.com/watch?v=_KVHxHYM9DQ&index=1&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj',
        1,
        0
    ),
    (
        7,
        '0.3.',
        'What a Protocol Should Contain (Video)',
        1,
        'https://www.youtube.com/watch?v=IhmliEn_ejw&index=2&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj',
        1,
        0
    ),
    (
        8,
        '2.1.',
        'Data Ownership & Authorship',
        0,
        '2_Data_Ownership_Authorship\\2018-03-07 Data Ownership & Authorship.pdf',
        1,
        0
    ),
    (
        9,
        '2.2.',
        'Data Ownership (Video)',
        1,
        'https://www.youtube.com/watch?v=aDQWTuAMKTQ&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj&index=5',
        1,
        0
    ),
    (
        10,
        '2.3.',
        'Data Ownership Agreement - Template',
        0,
        '2_Data_Ownership_Authorship\\2018-03-07 Data Ownership Agreement - Template.pdf',
        1,
        0
    ),
    (
        11,
        '2.4.',
        'CGIAR Author Guidance',
        0,
        '2_Data_Ownership_Authorship\\2015-03 CGIAR Author Guidance.pdf',
        1,
        0
    ),
    (
        12,
        '2.5.',
        'Data Ownership Agreement - Example',
        0,
        '2_Data_Ownership_Authorship\\2018-03-07 Data Ownership Agreement - Example.pdf',
        1,
        0
    ),
    (
        13,
        '2.6.',
        'CCAFS Publications Policy',
        0,
        '2_Data_Ownership_Authorship\\2012-08 CCAFS Publications Policy.pdf',
        1,
        0
    ),
    (
        14,
        '3.1.',
        'Budgeting and Planning for Data Management',
        0,
        '3_Budgeting_Planning\\2018-03-07_Budgeting_and_Planning_for_Data_Management.pdf',
        1,
        0
    ),
    (
        15,
        '3.2.',
        'Planning and Budgeting for Data Management (Video)',
        1,
        'https://www.youtube.com/watch?v=O0vpXLJPB5o&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj&index=4',
        1,
        0
    ),
    (
        16,
        '3.3.',
        'ILRI Data Management Process (flowcharts)',
        0,
        '3_Budgeting_Planning\\2014 ILRI Data Management Process (flowcharts).pdf',
        0,
        0
    ),
    (
        17,
        '3.4.',
        'Data Management Process - Narrative',
        0,
        '3_Budgeting_Planning\\2018-03-07 Data Management Process - Narative.pdf',
        1,
        0
    ),
    (
        18,
        '3.5.',
        'Creating a Data Management Plan',
        0,
        '3_Budgeting_Planning\\2018-03-07_Creating_a_Data_Management_Plan.pdf',
        1,
        0
    ),
    (
        19,
        '3.6.',
        'Data Management Plan (Video)',
        1,
        'https://www.youtube.com/watch?v=Q8jX_cH0C60&index=3&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj',
        1,
        0
    ),
    (
        20,
        '3.7.',
        'ToR Data Management Roles - General',
        0,
        '3_Budgeting_Planning\\2018-03-07 ToRs Data Management Roles.docx',
        1,
        0
    ),
    (
        21,
        '3.8.',
        'Example Data Management Activity Plan',
        0,
        '3_Budgeting_Planning\\2013-10 Example Data Management Activity Plan (CCAFS).pdf',
        1,
        0
    ),
    (
        22,
        '3.9.',
        'Tools for Research Projects',
        0,
        '3_Budgeting_Planning\\2018-03-07 Tools for Research Projects.pdf',
        1,
        0
    ),
    (
        23,
        '4.1.',
        'Creating and Using a Data and Document Storage Facility',
        0,
        '4_Data_Document_Store\\2018-03-14 Creating and Using a Data and Document Storage Facility.pdf',
        1,
        0
    ),
    (
        24,
        '4.2.',
        'Introduction to Data and Document Storage (Video)',
        1,
        'https://www.youtube.com/watch?v=4CQtJbg_Qms&index=6&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj',
        1,
        0
    ),
    (
        25,
        '4.3.',
        'Ownership Issues with Data and Document Stores (Video)',
        1,
        'https://www.youtube.com/watch?v=ML3UXLzaqRw&index=8&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj',
        1,
        0
    ),
    (
        26,
        '4.4.',
        'Data and Document Store Organisation (Video)',
        1,
        'https://www.youtube.com/watch?v=MMagU_77rdI&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj&index=7',
        1,
        0
    ),
    (
        27,
        '4.5.',
        'Introduction to Dropbox',
        0,
        '4_Data_Document_Store\\2018-03-07 Introduction to Dropbox.pdf',
        1,
        0
    ),
    (
        28,
        '4.6.',
        'Introduction to Dropbox (Video)',
        1,
        'https://www.youtube.com/watch?v=kvMkh4slKCU&index=9&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj',
        1,
        0
    ),
    (
        29,
        '5.1.',
        'Documents needed for Survey Fieldwork and Training',
        0,
        '5_Fieldwork\\2018-03-08 Documents for Survey Fieldwork and Training.pdf',
        1,
        0
    ),
    (
        30,
        '5.2.',
        'CCAFS Training Manual for Field Supervisors',
        0,
        '5_Fieldwork\\2010-11 CCAFS Training Manual for Field Supervisors.pdf',
        1,
        0
    ),
    (
        31,
        '5.3.',
        'CCAFS HBS Code Book',
        0,
        '5_Fieldwork\\2013-06 CCAFS HBS Code Book.pdf',
        1,
        0
    ),
    (
        32,
        '5.4.',
        'CCAFS HBS Questionnaire',
        0,
        '5_Fieldwork\\2011-08 CCAFS HBS Questionnaire.pdf',
        1,
        0
    ),
    (
        33,
        '5.5.',
        'Example Consent Form',
        0,
        '5_Fieldwork\\2013-10 Example Consent form.pdf',
        1,
        0
    ),
    (
        34,
        '5.6.',
        'Example Training Manual when using ODK',
        0,
        '5_Fieldwork\\2018-03-09_Training_Manual_Example_using_ODK.pdf',
        1,
        0
    ),
    (
        35,
        '6.1.',
        'Data Quality Assurance',
        0,
        '6_Managing_Data\\2018-03-09_Data_Quality_Assurance.pdf',
        1,
        0
    ),
    (
        36,
        '6.2.',
        'Data Quality Checking (Video)',
        1,
        'https://www.youtube.com/watch?v=vbxvtIbqkPA&index=15&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj',
        1,
        0
    ),
    (
        37,
        '6.3.',
        'Transition from Raw to Primary Data',
        0,
        '6_Managing_Data\\2018-03-09_Transition_from_Raw_to_Primary_Data.pdf',
        1,
        0
    ),
    (
        38,
        '6.4.',
        'Transition from Raw to Primary Data (Video)',
        1,
        'https://www.youtube.com/watch?v=IR0hbPIn_Yk&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj&index=17',
        1,
        0
    ),
    (
        39,
        '6.5.',
        'Guidance for Handling Different Types of Data',
        0,
        '6_Managing_Data\\2018-03-09_Guidance_for_handling_different_types_of_data.pdf',
        1,
        0
    ),
    (
        40,
        '6.6.',
        'Guidance for Handling Different Types of Data (Video)',
        1,
        'https://www.youtube.com/watch?v=SrRN2eHOVxk&index=16&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj',
        1,
        0
    ),
    (
        41,
        '7.1.',
        'Introduction to Metadata',
        0,
        '7_Metadata\\2018-03-09 Introduction to Metadata.pdf',
        1,
        0
    ),
    (
        42,
        '7.2.',
        'Metadata (Video)',
        1,
        'https://www.youtube.com/watch?v=AdX5OUJY9P0&index=11&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj',
        1,
        0
    ),
    (
        43,
        '7.3.',
        'CG Core Metadata Schema',
        0,
        '7_Metadata\\2016-11-23 CG Core Metadata Schema.pdf',
        1,
        0
    ),
    (
        44,
        '7.4.',
        'CG Core Basic for Researchers (Excel)',
        0,
        '7_Metadata\\2016-02-14 CG Core Basic for Researchers.xlsx',
        1,
        0
    ),
    (
        45,
        '7.5.',
        'CG Core Basic for Researchers  ',
        0,
        '7_Metadata\\2018-03-11 CG Core Metadata for Researchers.pdf',
        1,
        0
    ),
    (
        46,
        '7.6.',
        'ILRI Datasets Metadata Template (Excel)',
        0,
        '7_Metadata\\2014-04 ILRI Datasets Metadata Template.xlsx',
        0,
        0
    ),
    (
        47,
        '8.1.',
        'Principles for Archiving and Sharing',
        0,
        '8_Archiving_Sharing/2018-03-11_Principles_for_Archiving_and_Sharing.pdf',
        1,
        0
    ),
    (
        48,
        '8.2.',
        'Archiving & Sharing Data (Video)',
        1,
        'https://www.youtube.com/watch?v=H8sO21P5RBc&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj&index=10',
        1,
        0
    ),
    (
        49,
        '8.3.',
        'Data and Documents to Submit for Archiving - a checklist',
        0,
        '8_Archiving_Sharing/2018-03-11 Data and Documents to Submit for Archiving - Checklist.pdf',
        1,
        0
    ),
    (
        50,
        '8.4.',
        'Portals for Archiving & Sharing',
        0,
        '8_Archiving_Sharing/2018-03-11_Portals_for_Archiving_and_Sharing.pdf',
        1,
        0
    ),
    (
        51,
        '8.5.',
        'Introduction to Dataverse',
        0,
        '8_Archiving_Sharing/2018-03-11 Introduction to Dataverse.pdf',
        1,
        0
    ),
    (
        52,
        '8.6.',
        'Introduction to Dataverse (Video)',
        1,
        'https://www.youtube.com/watch?v=EGYuj1JM1Qc&index=12&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj',
        1,
        0
    ),
    (
        53,
        '8.7.',
        'Creating a Dataverse (Video)',
        1,
        'https://www.youtube.com/watch?v=9dMtCvCpZNM&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj&index=13',
        1,
        0
    ),
    (
        54,
        '8.8.',
        'CCAFS Dataverse (Video)',
        1,
        'https://www.youtube.com/watch?v=tr33h7TzFeY&list=PLK5PktXR1tmNRaUPsFiYlyhg2lui0xgpj&index=14',
        1,
        0
    ),
    (
        55,
        '8.9.',
        'Introduction to Dspace (Coming soon)',
        0,
        '',
        1,
        0
    ),
    (
        56,
        '8.10.',
        'Introduction to AgTrials (Coming soon)',
        0,
        '',
        1,
        0
    ),
    (
        57,
        '8.11.',
        'Introduction to CCAFS-Climate (Coming soon)',
        0,
        '',
        1,
        0
    ),
    (
        58,
        '1.2.',
        'CIAT/CCAFS Open Access & Data Management Implementation Plan',
        0,
        '',
        1,
        0
    ),
    (
        59,
        '1.3.',
        'CIAT Intellectual Assets Policy',
        0,
        '',
        1,
        0
    ),
    (
        60,
        '1.4.',
        'CIAT Open Access Policy',
        0,
        '',
        1,
        0
    ),
    (
        61,
        '2.7.',
        'CIAT Scientific or Technical Publications Directive',
        0,
        '',
        1,
        0
    ),
    (
        62,
        '2.8.',
        'CIAT Authorship Directive',
        0,
        '',
        1,
        0
    ),
    (
        63,
        '3.3.',
        'CIAT Data Management Process Flowcharts (Coming Soon)',
        0,
        '',
        1,
        0
    ),
    (
        64,
        '4.7.',
        'Introduction to OneDrive',
        0,
        '',
        1,
        0
    ),
    (
        65,
        '7.6.',
        'CIAT/CCAFS  Dataverse Metadata Template (coming soon)',
        0,
        '',
        1, 
        0
    ),
    (
        71,
        "0.1.",
        "CCAFS Results-Based Management Strategy (2016) - CCAFS Full Proposal Annexes 3.0.5 (p.34-45)",
        0,
        "https:\/\/cgspace.cgiar.org\/bitstream\/handle\/10947\/4255\/2-CCAFS%20Annexes%20to%20Full%20Proposal.pdf?sequence=1",
        1,
        1
    ),
    (
        72,
        "0.2.",
        "CCAFS Monitoring and Evaluation Strategy (2014)",
        0,
        "https:\/\/ccafs.cgiar.org\/publications\/ccafs-monitoring-and-evaluation-strategy#.W37U8OhKiUl",
        1,
        1
    ),
    (
        73,
        "0.3.",
        "Strategy for Priority Setting, Monitoring and Evaluation (2012)",
        0,
        "https:\/\/ccafs.cgiar.org\/publications\/strategy-priority-setting-monitoring-and-evaluation#.W37VAehKiUl",
        1,
        1
    ),
    (
        74,
        "0.4.",
        "Glossary",
        0,
        "https:\/\/drive.google.com\/file\/d\/1v-TKR2jdC-N8GHB3STUy0g_W8qp-WUCt\/view",
        1,
        1
    ),
    (
        75,
        "0.5.",
        "Operationalization Plan",
        0,
        "data\/0_Monitoring_Evaluation_And_Learning_Basics\/Template_M-E_Operationalization-Plan.docx ",
        1,
        1
    ),
    (
        76,
        "0.6.",
        "Social Learning where business as usual does not work (2016) - Learning Note",
        0,
        "https:\/\/cgspace.cgiar.org\/bitstream\/handle\/10568\/79864\/CCAFS%20CCSL%20learning%20brief%2017%20FINAL.pdf?sequence=1&isAllowed=y",
        1,
        1
    ),
    (
        77,
        "0.7.",
        "Climate Change Social Learning Sandbox (2014) - Learning Note",
        0,
        "https:\/\/cgspace.cgiar.org\/handle\/10568\/42428",
        1,
        1
    ),
    (
        78,
        "0.10.",
        "Logical Framework Template",
        0,
        "data\/CIMMYT_Tools_for_MEL_Support_Pack\/1.3.2.3LogicalFrameworkTemplateEdits(8).docx",
        1,
        1
    ),
    (
        79,
        "0.11.",
        "Guiding Questions for Assumptions",
        0,
        "data\/CIMMYT_Tools_for_MEL_Support_Pack\/GuidingQuestionsforAssumptions(1).docx",
        1,
        1
    ),
    (
        710,
        "1.1.",
        "Building your thematic program (flagship) Impact Pathway & Theory of Change - facilitation guide section A",
        0,
        "https:\/\/cgspace.cgiar.org\/handle\/10568\/56873",
        1,
        1
    ),
    (
        711,
        "1.10.",
        "Planning Template for projects",
        0,
        "data\/CIMMYT_Tools_for_MEL_Support_Pack\/1.3.2.4MEL-GuidelinesfordevelopingaprojectTOCedit(2).docx",
        1,
        1
    ),
    (
        712,
        "1.11.",
        "Planning Template for Flagships",
        0,
        "data\/1_Theory_Of_Change_And_Impact_Pathways\/Impact_Pathways_template_blank.pptx ",
        1,
        1
    ),
    (
        713,
        "1.2.",
        "Building your Regional Impact Pathway & Theory of Change - facilitation guide section B",
        0,
        "https:\/\/cgspace.cgiar.org\/handle\/10568\/56873 ",
        1,
        1
    ),
    (
        714,
        "1.3.",
        "Building your Project Impact Pathway & Theory of Change - facilitation guide section C",
        0,
        "https:\/\/cgspace.cgiar.org\/handle\/10568\/56873 ",
        1,
        1
    ),
    (
        715,
        "1.4.",
        "Impact Pathway & Theory of Change LIGHT - template blank",
        0,
        "data\/1_Theory_Of_Change_And_Impact_Pathways\/Impact_Pathways_template_blank.pptx ",
        1,
        1
    ),
    (
        716,
        "1.5.",
        "Impact Pathway & Theory of Change LIGHT - CCAFS FP1 example",
        0,
        "data\/1_Theory_Of_Change_And_Impact_Pathways\/Impact_Pathways_template_example.pptx ",
        1,
        1
    ),
    (
        717,
        "1.12.",
        "Guiding Questions to Test Assumptions in ToC",
        0,
        "data\/CIMMYT_Tools_for_MEL_Support_Pack\/1.3.2.4MEL-GuidelinesfordevelopingaprojectTOCedit(2).docx",
        1,
        1
    ),
    (
        718,
        "2.3.",
        "Good practices for indicator development and reporting (2009) OECD",
        0,
        "https:\/\/www.oecd.org\/site\/progresskorea\/43586563.pdf ",
        1,
        1
    ),
    (
        719,
        "2.4.",
        "Tips for defining indicators",
        0,
        "data\/2_Indicators\/General_Guidance_on_Developing_Indicators.docx ",
        1,
        1
    ),
    (
        720,
        "2.7.",
        "General Guidance for Developing Indicators",
        0,
        "data\/CIMMYT_Tools_for_MEL_Support_Pack\/GeneralGuidanceonDevelopingIndicators.docx",
        1,
        1
    ),
    (
        721,
        "3.1.",
        "CCAFS Baseline surveys: how they came about",
        0,
        "https:\/\/ccafs.cgiar.org\/baselines-0#.W37WUuhKiUl ",
        1,
        1
    ),
    (
        722,
        "3.2.",
        "Global summary of baseline household survey results (2014)",
        0,
        "https:\/\/cgspace.cgiar.org\/handle\/10568\/16426 ",
        1,
        1
    ),
    (
        723,
        "3.3.",
        "Relevant read: Baseline resources (Reports)",
        0,
        "https:\/\/ccafs.cgiar.org\/resources\/baseline-surveys#.W37Wf-hKiUk",
        1,
        1
    ),
    (
        724,
        "3.4.",
        "Baseline data (Datasets)",
        0,
        "https:\/\/dataverse.harvard.edu\/dataverse\/CCAFSbaseline",
        1,
        1
    ),
    (
        725,
        "3.5.",
        "Materials for Baseline household surveys",
        0,
        "https:\/\/ccafs.cgiar.org\/resources\/baseline-surveys#household",
        1,
        1
    ),
    (
        726,
        "3.6.",
        "Materials for Baseline village surveys",
        0,
        "https:\/\/ccafs.cgiar.org\/resources\/baseline-surveys#village",
        1,
        1
    ),
    (
        727,
        "3.7.",
        "Materials for Baseline organisational surveys",
        0,
        "https:\/\/ccafs.cgiar.org\/resources\/baseline-surveys#organisational",
        1,
        1
    ),
    (
        728,
        "3.8.",
        "Materials for Baseline indicator documents",
        0,
        "https:\/\/ccafs.cgiar.org\/resources\/baseline-surveys#baseline_indicator",
        1,
        1
    ),
    (
        729,
        "4.1.",
        "Why reflection?",
        0,
        "data\/4_Reflection_Mechanisms\/Reflection_Workshop-Agenda-Example.docx ",
        1,
        1
    ),
    (
        730,
        "4.2.",
        "Example agenda for (regional) reflection meeting",
        0,
        "data\/4_Reflection_Mechanisms\/Reflection_Workshop-Agenda-Example.docx ",
        1,
        1
    ),
    (
        731,
        "5.2. ",
        "CCAFS online reporting platform",
        0,
        "http:\/\/marlo.cgiar.org\/",
        1,
        1
    ),
    (
        732,
        "5.3.",
        "CRP and Platforms Phase II standard planning and reporting",
        0,
        "https:\/\/sites.google.com\/cgxchange.org\/cgiar-pbm-resources\/home",
        1,
        1
    ),
    (
        733,
        "6.1.",
        "CCAFS utilizes four different types of impact assessment studies",
        0,
        "https:\/\/ccafs.cgiar.org\/impact-assessment#.W37W1uhKiUl ",
        1,
        1
    ),
    (
        734,
        "6.10.",
        "Evaluation plan template",
        0,
        "data\/CIMMYT_Tools_for_MEL_Support_Pack\/2.3.4MEL-EvaluationPlanTemplateEdit(4).docx",
        1,
        1
    ),
    (
        735,
        "6.12.",
        "Outcome Harvesting - use case for CCAFS Climate Data and Tools (2016) - Info Note",
        0,
        "https:\/\/cgspace.cgiar.org\/rest\/bitstreams\/119997\/retrieve ",
        1,
        1
    ),
    (
        736,
        "6.2.",
        "Reference material - betterevaluation website and community",
        0,
        "https:\/\/www.betterevaluation.org\/",
        1,
        1
    ),
    (
        737,
        "6.3.",
        "CGIAR Independent Evaluation Arrangement",
        0,
        "http:\/\/iea.cgiar.org\/",
        1,
        1
    ),
    (
        738,
        "6.4.",
        "CGIAR Independent Evaluation Arrangement Evaluation Community of Practice",
        0,
        "http:\/\/iea.cgiar.org\/ecop\/",
        1,
        1
    ),
    (
        739,
        "6.7. ",
        "CGIAR Policy for Independent External Evaluations (2012)",
        0,
        "https:\/\/cgspace.cgiar.org\/bitstream\/handle\/10947\/4378\/CGIAR_evaluation_policy_jan2012.pdf?sequence=1 ",
        1,
        1
    ),
    (
        740,
        "6.9.",
        "CCAFS Reporting and Evaluation in a results-based management framework (2015)",
        0,
        "https:\/\/cgspace.cgiar.org\/handle\/10568\/67362 ",
        1,
        1
    ),
    (
        741,
        "6.14.",
        "After Action Review Guidance (Post Project) ",
        0,
        "data\/CIMMYT_Tools_for_MEL_Support_Pack\/5.5.1AfterActionReviewGuidance-formatEdit.docx",
        1,
        1
    ),
    (
        742,
        "7.1.",
        "Monitoring and evaluation operational plan - Basic utilization-focused template (adapted from IDRC)",
        0,
        "data\/7_Monitoring_Evaluation_Learning_Tools\/Overview-Network-Mapping_Tools-FP1.docx",
        1,
        1
    ),
    (
        743,
        "7.10.",
        "Four quadrants = a rapid mini After Action Review",
        0,
        "data\/7_Monitoring_Evaluation_Learning_Tools\/Template_Four_quadrants_mini-rapid_AAR.docx ",
        1,
        1
    ),
    (
        744,
        "7.11. ",
        "Reference Evaluation Toolbox",
        0,
        "http:\/\/evaluationtoolbox.net.au\/index.php?option=com_content&view=article&id=51&Itemid=5",
        1,
        1
    ),
    (
        745,
        "7.13.",
        "Overview of network mapping tools",
        0,
        "data\/7_Monitoring_Evaluation_Learning_Tools\/Overview-Network-Mapping_Tools-FP1.docx",
        1,
        1
    ),
    (
        746,
        "7.15. ",
        "Meeting documentation",
        0,
        "data\/7_Monitoring_Evaluation_Learning_Tools\/Template_Meeting_Minutes.docx",
        1,
        1
    ),
    (
        747,
        "7.16.",
        "Meeting Monitoring Template (LAM example) - to document meetings held within the different activities.",
        0,
        "https:\/\/docs.google.com\/spreadsheets\/d\/1665Pzc7dvrIr693ly5zpaADxC70lzqLINR1eoBK_TJk\/edit#gid=323218919 ",
        1,
        1
    ),
    (
        748,
        "7.17.",
        "Meeting Minutes - template example",
        0,
        "data\/7_Monitoring_Evaluation_Learning_Tools\/Template_Meeting_Minutes.docx",
        1,
        1
    ),
    (
        749,
        "7.18. ",
        "Participants attendance registration - template example Word",
        0,
        "data\/7_Monitoring_Evaluation_Learning_Tools\/Template_Participants-Attendance_List.docx ",
        1,
        1
    ),
    (
        750,
        "7.19.",
        "Participants\/ attendance registration - template example Excel",
        0,
        "data\/7_Monitoring_Evaluation_Learning_Tools\/Template_Participants-Attendence_List.xlsx ",
        1,
        1
    ),
    (
        751,
        "7.2.",
        "Knowledge Attitude Skills Practice Survey Tool (EA example)",
        0,
        "data\/7_Monitoring_Evaluation_Learning_Tools\/Template-KASP_Survey_Example_PACCA.docx ",
        1,
        1
    ),
    (
        752,
        "7.20.",
        "Google Analytics (YouTube for beginners 2017)",
        0,
        "https:\/\/www.youtube.com\/watch?v=braJCJhfwQU ",
        1,
        1
    ),
    (
        753,
        "7.23. ",
        "Measuring how communication and engagement efforts help deliver outcomes (2017) - Info Note",
        0,
        "https:\/\/cgspace.cgiar.org\/handle\/10568\/82752 ",
        1,
        1
    ),
    (
        754,
        "7.24.",
        "Selected outcome-focused monitoring tools for communication and engagement (2017) Info Note",
        0,
        "https:\/\/cgspace.cgiar.org\/handle\/10568\/82753",
        1,
        1
    ),
    (
        755,
        "7.3.",
        "Reference to KAP Survey Model",
        0,
        "data\/7_Monitoring_Evaluation_Learning_Tools\/Template_KASP.doc ",
        1,
        1
    ),
    (
        756,
        "7.6.",
        "Stories of change using Most Significant Change (MSC) - template for collecting potential MSCs",
        0,
        "data\/7_Monitoring_Evaluation_Learning_Tools\/Template_for_MSC_stories.docx ",
        1,
        1
    ),
    (
        757,
        "7.9.",
        "After Activity Evaluation (EA example)",
        0,
        "https:\/\/ccafs-fp4-rbm-m-e-trial.wikispaces.com\/file\/view\/After%20Activity%20Evaluation.docx\/521753300\/After%20Activity%20Evaluation.docx ",
        1,
        1
    ),
    (
        758,
        "7.25.",
        "Learning Plan Template",
        0,
        "data\/CIMMYT_Tools_for_MEL_Support_Pack\/2.3.5MEL-LearningPlanTemplateEdit.docx",
        1,
        1
    ),
    (
        759,
        "8.1.",
        "CCAFS online planning and reporting system (CCAFS P&R Learning Note) - in use until 2015",
        0,
        "https:\/\/cgspace.cgiar.org\/rest\/bitstreams\/66361\/retrieve ",
        1,
        1
    ),
    (
        760,
        "9.2.",
        "Knowledge sharing toolkit (Great wealth of resources)",
        0,
        "http:\/\/www.kstoolkit.org\/home ",
        1,
        1
    ),
    (
        761,
        "9.4.",
        "Betterevaluation (Great sharing site for information to improve evaluations)",
        0,
        "https:\/\/www.betterevaluation.org\/ ",
        1,
        1
    ),
    (
        762,
        "9.5.",
        "Guideline to conduct Writeshops to capture and disseminate learning",
        0,
        "http:\/\/www.mamud.com\/Docs\/Writeshops_3_Guidelines.pdf ",
        1,
        1
    ),
    (
        763,
        "9.6. ",
        "How the Bank (Worldbank) learns",
        0,
        "http:\/\/ieg.worldbankgroup.org\/evaluations\/learning-and-results",
        1,
        1
    ),
    (
        764,
        "9.7.",
        "Monitoring & Evaluation: Some Tools, Methods & Approaches (WorldBank, 2004)",
        0,
        "data\/9_Overall_References\/XXMandE_tools_methods_approaches.pdf ",
        1,
        1
    ),
    (
        765,
        "9.8. ",
        "Ten Steps to a Results-Based Monitoring and Evaluation System (OECD, 2004)",
        0,
        "https:\/\/www.oecd.org\/dac\/peer-reviews\/World%20bank%202004%2010_Steps_to_a_Results_Based_ME_System.pdf ",
        1,
        1
    ),
    (
        766,
        "9.9. ",
        "Review of the use of Theory of Change in international development (2012)",
        0,
        "http:\/\/www.theoryofchange.org\/pdf\/DFID_ToC_Review_ ",
        1,
        1
    ),
    (
        767,
        "0.12",
        "M&E Plan Template with Examples",
        0,
        "data\/0_Monitoring_Evaluation_And_Learning_Basics\/Template_M-E_Operationalization-Plan-forage.docx",
        1,
        1
    );
/*!40000 ALTER TABLE `sp_guidelines` ENABLE KEYS */
;
UNLOCK TABLES;



--
-- Table structure for table `sp_download_guidelines`
--
DROP TABLE IF EXISTS `sp_download_guidelines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_download_guidelines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `download_id` int(11) NOT NULL,
  `guideline_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sp_guidelines_downloaded_sp_download_idx` (`download_id`),
  KEY `fk_sp_guidelines_downloaded_sp_guidelines_idx1` (`guideline_id`),
  CONSTRAINT `fk_download` FOREIGN KEY (`download_id`) REFERENCES `sp_download` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_guideline` FOREIGN KEY (`guideline_id`) REFERENCES `sp_guidelines` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 65 DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_download_guidelines`
--
LOCK TABLES `sp_download_guidelines` WRITE;
/*!40000 ALTER TABLE `sp_download_guidelines` DISABLE KEYS */
;
INSERT INTO `sp_download_guidelines`
VALUES (1, 1, 8),
(2, 2, 9);
/*!40000 ALTER TABLE `sp_download_guidelines` ENABLE KEYS */
;
UNLOCK TABLES;



--
-- Table structure for table `sp_sphere`
--
DROP TABLE IF EXISTS `sp_sphere`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_sphere` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = latin1;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_sphere`
--
LOCK TABLES `sp_sphere` WRITE;
/*!40000 ALTER TABLE `sp_sphere` DISABLE KEYS */
;
INSERT INTO `sp_sphere`
VALUES (1, 'Strategic Planning'),
(2, 'Legal'),
(3, 'Managerial'),
(4, 'Communications'),
(5, 'Technical'),
(6, 'Data Management'),
(7, 'Using the Data');
/*!40000 ALTER TABLE `sp_sphere` ENABLE KEYS */
;
UNLOCK TABLES;


--
-- Table structure for table `sp_roles`
--
DROP TABLE IF EXISTS `sp_stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_stages` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `app_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sp_stages_sp_apps_idx1` (`app_id`),
  CONSTRAINT `fk_stages_app` FOREIGN KEY (`app_id`) REFERENCES `sp_apps` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_stages`
--
LOCK TABLES `sp_stages` WRITE;
/*!40000 ALTER TABLE `sp_stages` DISABLE KEYS */
;
INSERT INTO `sp_stages`
VALUES (
    1,
    'Proposal Stage',
    'You are writing a project concept note or proposal for funding consideration',
    0
  ),
(
    2,
    'Grant Opening',
    'Your project has been funded and you are starting research activities',
    0
  ),
(
    3,
    'Project Research',
    'You are carrying out activities that will achieve project objectives',
    0
  ),
(
    4,
    'Publishing',
    'You are sharing the results of your project',
    0
  ),
(
    5,
    'Grant Close out',
    'The project is coming to an end and you are housekeeping',
    0
  ),
(
    6,
    'Designing',
    '',
    1
  ),
(
    7,
    'Implementation ',
    '',
    1
  ),
(
    8,
    'Closure & Beyond',
    '',
    1
  );
/*!40000 ALTER TABLE `sp_stages` ENABLE KEYS */
;
UNLOCK TABLES;


--
-- Table structure for table `sp_roles`
--
DROP TABLE IF EXISTS `sp_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_roles` (
  `id` int(11) NOT NULL,
  `acronym` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `app_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sp_roles_sp_apps_idx1` (`app_id`),
  CONSTRAINT `fk_roles_app` FOREIGN KEY (`app_id`) REFERENCES `sp_apps` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_roles`
--
LOCK TABLES `sp_roles` WRITE;
/*!40000 ALTER TABLE `sp_roles` DISABLE KEYS */
;
INSERT INTO `sp_roles`
VALUES (1, 'PI', 'Principal Investigator',0),
(2, 'R', 'Researcher',0),
(3, 'DM', 'Data Manager',0),
(4, 'PM', 'Program Manager',1),
(5, 'PJM', 'Project Manager',1),
(6, 'M&EO', 'M&E Officer',1);
/*!40000 ALTER TABLE `sp_roles` ENABLE KEYS */
;
UNLOCK TABLES;



--
-- Table structure for table `sp_regions`
--
DROP TABLE IF EXISTS `sp_regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(90) DEFAULT NULL,
  `name` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_regions`
--
LOCK TABLES `sp_regions` WRITE;
/*!40000 ALTER TABLE `sp_regions` DISABLE KEYS */
;
INSERT INTO `sp_regions`
VALUES (1, 'africa', 'Africa'),
(2, 'asia', 'Asia'),
(3, 'oceania', 'Australia and Oceania'),
(
    4,
    'central_america_caribbean',
    'Central America and the Caribbean'
  ),
(
    5,
    'middle_east_north_africa',
    'Middle East and North Africa'
  ),
(6, 'north_america', 'North America'),
(7, 'south_america', 'South America'),
(8, 'europe', 'Europe');
/*!40000 ALTER TABLE `sp_regions` ENABLE KEYS */
;
UNLOCK TABLES;



--
-- Table structure for table `sp_importance_levels`
--
DROP TABLE IF EXISTS `sp_importance_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_importance_levels` (
  `id` int(11) NOT NULL,
  `guideline_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `stage_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `importance_level` enum('Very important', 'Important', 'Useful', 'Optional') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sp_importance_levels_sp_categories1_idx1` (`category_id`),
  KEY `fk_sp_importance_levels_sp_roles1_idx1` (`role_id`) USING BTREE,
  KEY `fk_sp_importance_levels_sp_guidelines1_idx1` (`guideline_id`) USING BTREE,
  KEY `fk_sp_importance_levels_sp_stages1_idx1` (`stage_id`) USING BTREE,
  KEY `fk_sp_importance_levels_performance` (`role_id`, `stage_id`, `guideline_id`) USING BTREE,
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `sp_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_guidelines` FOREIGN KEY (`guideline_id`) REFERENCES `sp_guidelines` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_rol_id` FOREIGN KEY (`role_id`) REFERENCES `sp_roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_stage` FOREIGN KEY (`stage_id`) REFERENCES `sp_stages` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_importance_levels`
--
LOCK TABLES `sp_importance_levels` WRITE;
/*!40000 ALTER TABLE `sp_importance_levels` DISABLE KEYS */
;
INSERT INTO `sp_importance_levels`
VALUES (1, 1, 1, 1, 1, 'Very important'),
(2, 2, 13, 3, 2, 'Important'),
(3, 711, 7, 1, 3, 'Useful'),
(4, 761, 12, 2, 2, 'Optional');
/*!40000 ALTER TABLE `sp_importance_levels` ENABLE KEYS */
;
UNLOCK TABLES;


--
-- Table structure for table `sp_download_guidelines`
--
DROP TABLE IF EXISTS `sp_download_guidelines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_download_guidelines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `download_id` int(11) NOT NULL,
  `guideline_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sp_guidelines_downloaded_sp_download1_idx` (`download_id`),
  KEY `fk_sp_guidelines_downloaded_sp_guidelines1_idx1` (`guideline_id`),
  CONSTRAINT `fk_download` FOREIGN KEY (`download_id`) REFERENCES `sp_download` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_guideline` FOREIGN KEY (`guideline_id`) REFERENCES `sp_guidelines` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 65 DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_download_guidelines`
--
LOCK TABLES `sp_download_guidelines` WRITE;
/*!40000 ALTER TABLE `sp_download_guidelines` DISABLE KEYS */
;
INSERT INTO `sp_download_guidelines`
VALUES (1, 1, 8),
(2, 2, 9),
(3, 3, 8);
/*!40000 ALTER TABLE `sp_download_guidelines` ENABLE KEYS */
;
UNLOCK TABLES;



--
-- Table structure for table `sp_download_regions`
--
DROP TABLE IF EXISTS `sp_download_regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_download_regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `download_id` int(11) NOT NULL,
  `region_id` int(11) NOT NULL,
  `region_scope` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_download_idx` (`download_id`),
  KEY `fk_download_regions_region_id_idx` (`region_id`),
  CONSTRAINT `fk_download_regions_download_id` FOREIGN KEY (`download_id`) REFERENCES `sp_download` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_download_regions_region_id` FOREIGN KEY (`region_id`) REFERENCES `sp_regions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 47 DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_download_regions`
--
LOCK TABLES `sp_download_regions` WRITE;
/*!40000 ALTER TABLE `sp_download_regions` DISABLE KEYS */
;
INSERT INTO `sp_download_regions`
VALUES (5, 1, 7, 'instituteRegion'),
(6, 2, 8, 'instituteRegion'),
(7, 3, 1, 'researchRegion');
/*!40000 ALTER TABLE `sp_download_regions` ENABLE KEYS */
;
UNLOCK TABLES;


--
-- Table structure for table `sp_download_guidelines`
--
DROP TABLE IF EXISTS `sp_download_guidelines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_download_guidelines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `download_id` int(11) NOT NULL,
  `guideline_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sp_guidelines_downloaded_sp_download1_idx` (`download_id`),
  KEY `fk_sp_guidelines_downloaded_sp_guidelines1_idx1` (`guideline_id`),
  CONSTRAINT `fk_download` FOREIGN KEY (`download_id`) REFERENCES `sp_download` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_guideline` FOREIGN KEY (`guideline_id`) REFERENCES `sp_guidelines` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 65 DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_download_guidelines`
--
LOCK TABLES `sp_download_guidelines` WRITE;
/*!40000 ALTER TABLE `sp_download_guidelines` DISABLE KEYS */
;
INSERT INTO `sp_download_guidelines`
VALUES (37, 1, 8),
(38, 2, 9),
(39, 3, 8);
/*!40000 ALTER TABLE `sp_download_guidelines` ENABLE KEYS */
;
UNLOCK TABLES;


--
-- Table structure for table `sp_guidelines_spheres`
--
DROP TABLE IF EXISTS `sp_guidelines_spheres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `sp_guidelines_spheres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sphere_id` int(11) NOT NULL,
  `guideline_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sphere_relationship_idx` (`sphere_id`),
  KEY `fk_guideline_relationship_idx` (`guideline_id`),
  CONSTRAINT `fk_guideline_relationship` FOREIGN KEY (`guideline_id`) REFERENCES `sp_guidelines` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sphere_relationship` FOREIGN KEY (`sphere_id`) REFERENCES `sp_sphere` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 99 DEFAULT CHARSET = latin1;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sp_guidelines_spheres`
--
LOCK TABLES `sp_guidelines_spheres` WRITE;
/*!40000 ALTER TABLE `sp_guidelines_spheres` DISABLE KEYS */
;
INSERT INTO `sp_guidelines_spheres`
VALUES (1, 1, 1),
(2, 2, 1),
(3, 3, 2);
/*!40000 ALTER TABLE `sp_guidelines_spheres` ENABLE KEYS */
;
UNLOCK TABLES;