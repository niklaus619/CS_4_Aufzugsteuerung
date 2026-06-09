#ifndef DRIVEMNGBASE_H
  #pragma once
  #define DRIVEMNGBASE_H

  //****************************************************************************************************
  //** NEWINST COMMANDS (Range reserved for Businterface commands: 0x8390 - 0x83AF , 0x85A0 - 0x85AF) **
  //****************************************************************************************************
  #define  BUSIF_DRIVEMNGBASE_STARTCOMMUNICATION    0x8390
  #define  BUSIF_DRIVEMNGBASE_SER_NO_LEN            0x8391
  #define  BUSIF_DRIVEMNGBASE_SER_NO_DATA           0x8392
  #define  BUSIF_DRIVEMNGBASE_SET_PARALIST          0x8393
  #define  BUSIF_DRIVEMNGBASE_GET_PARA_STATE        0x8394
  #define  BUSIF_DRIVEMNGBASE_SET_PARAMETER         0x8395
  #define  BUSIF_DRIVEMNGBASE_GET_PARAMETER         0x8396
  #define  BUSIF_DRIVEMNGBASE_GET_CMD_STATE         0x8397
  #define  BUSIF_DRIVEMNGBASE_EXTERN_INIT_FINISH    0x8398
  #define  BUSIF_DRIVEMNGBASE_GET_DRIVE_INT_STATE   0x8399
  #define  BUSIF_DRIVEMNGBASE_GET_SERIES            0x839A
  #define  BUSIF_DRIVEMNGBASE_GET_AXIS_WR_PTR       0x839B
  #define  BUSIF_DRIVEMNGBASE_GET_AXIS_RD_PTR       0x839C
  #define  BUSIF_DRIVEMNGBASE_INIT_DRIVE            0x839D
  #define  BUSIF_DRIVEMNGBASE_GET_SYNC_PARA         0x839E
  #define  BUSIF_DRIVEMNGBASE_SET_SYNC_PARA         0x839F
  #define  BUSIF_DRIVEMNGBASE_SDD_GETSERIES         0x83A0
  #define  BUSIF_DRIVEMNGBASE_READ_FPGA_VERSION     0x83A1
  #define  BUSIF_DRIVEMNGBASE_READ_RETRY_COUNTER    0x83A2
  #define  BUSIF_DRIVEMNGBASE_CREATE_DEF_PARALIST   0x83A3
  #define  BUSIF_DRIVEMNGBASE_READ_DEVICEID         0x83A4
  #define  BUSIF_DRIVEMNGBASE_READ_OFFLINE_DEVICEID 0x83A5  
  #define  BUSIF_DRIVEMNGBASE_SET_OBJECT_CALLBACK   0x83A6
  #define  BUSIF_DRIVEMNGBASE_WRITE_PARAMETER       0x83A7
  #define  BUSIF_DRIVEMNGBASE_READ_PARAMETER        0x83A8
  #define  BUSIF_DRIVEMNGBASE_GET_BUSTYPE           0x83A9
  #define  BUSIF_DRIVEMNGBASE_GET_FILE              0x83AA  //Method to read file from drive
  #define  BUSIF_DRIVEMNGBASE_GET_FILE_STATE        0x83AB  //Method to get the state from read/write file call
  #define  BUSIF_DRIVEMNGBASE_SET_FILE              0x83AC  //Method do write file to drive
  #define  BUSIF_DRIVEMNGBASE_GET_FILE_SIZE         0x83AD  //Method to read the size of a file from drive
  #define  BUSIF_DRIVEMNGBASE_GET_FILE_BUFFER       0x83AE  //Method to read file from drive to a memory buffer, and dont create a local file. Use GET_FILE_SIZE for the right buffer size.
  #define  BUSIF_DRIVEMNGBASE_GET_TRANSPARENT_STATE 0x83AF  //Method to get the transparent state from the businterface
  
  #define  BUSIF_DRIVEMNGBASE_GET_AXIS_WR_PTR_AND_LEN 0x85A0
  #define  BUSIF_DRIVEMNGBASE_GET_AXIS_RD_PTR_AND_LEN 0x85A1
  
  #define  BUSIF_DRIVEMNGBASE_GET_FILE_CB_VER1            1
  #define  BUSIF_DRIVEMNGBASE_GET_FILE_CB_VERMAX          BUSIF_DRIVEMNGBASE_GET_FILE_CB_VER1

  #define  BUSIF_DRIVEMNGBASE_GET_FILE_STATE_CB_VER1      1
  #define  BUSIF_DRIVEMNGBASE_GET_FILE_STATE_CB_VERMAX    BUSIF_DRIVEMNGBASE_GET_FILE_STATE_CB_VER1

  #define  BUSIF_DRIVEMNGBASE_SET_FILE_CB_VER1            1
  #define  BUSIF_DRIVEMNGBASE_SET_FILE_CB_VERMAX          BUSIF_DRIVEMNGBASE_SET_FILE_CB_VER1

  #define  BUSIF_DRIVEMNGBASE_GET_FILE_SIZE_CB_VER1       1
  #define  BUSIF_DRIVEMNGBASE_GET_FILE_SIZE_CB_VERMAX     BUSIF_DRIVEMNGBASE_GET_FILE_SIZE_CB_VER1

  #define  BUSIF_DRIVEMNGBASE_GET_FILE_BUFFER_CB_VER1     1
  #define  BUSIF_DRIVEMNGBASE_GET_FILE_BUFFER_CB_VERMAX   BUSIF_DRIVEMNGBASE_GET_FILE_BUFFER_CB_VER1
  
  #define  BUSIF_DRIVEMNGBASE_GET_AXIS_WR_PTR_AND_LEN_VER_1     1
  #define  BUSIF_DRIVEMNGBASE_GET_AXIS_WR_PTR_AND_LEN_VER_MAX   BUSIF_DRIVEMNGBASE_GET_AXIS_WR_PTR_AND_LEN_VER_1
  
  #define  BUSIF_DRIVEMNGBASE_GET_AXIS_RD_PTR_AND_LEN_VER_1     1
  #define  BUSIF_DRIVEMNGBASE_GET_AXIS_RD_PTR_AND_LEN_VER_MAX   BUSIF_DRIVEMNGBASE_GET_AXIS_RD_PTR_AND_LEN_VER_1

     
  
  //Subcommandos for BUSIF_DRIVEMNGBASE_WRITE_PARAMETER and BUSIF_DRIVEMNGBASE_READ_PARAMETER
  #define  _BUS_IF_DRVMNG_DEVICEADDRESS       0
  #define  _BUS_IF_DRVMNG_VENDORID            1
  #define  _BUS_IF_DRVMNG_DISABLE_DEVICE      2
  #define  _BUS_IF_DRVMNG_ENABLE_DEVICE       3
  

  #define DRIVEMNG_SDO_TIMOUT                 1000
  #define DRIVEMNG_WRITE_PLCTIME              (1000*60*30)    //cyclic time to write PLC time stamp to drive

  
  //**********************************************************************************
  //** Drive Device IDs                                                             **
  //**********************************************************************************
  
  //SDD1X00 drives varan
  #define DRIVEMNG_BUSDEVICEID_SDD1300    1237  //3 axes
  #define DRIVEMNG_BUSDEVICEID_SDD1400    1238  //4 axes
  #define DRIVEMNG_BUSDEVICEID_SDD1500    1239  //5 axes
  #define DRIVEMNG_BUSDEVICEID_SDD1600    1240  //6 axes
  
  //drives with flex fsoe configuration
  #define DRIVEMNG_BUSDEVICEID_MDD2000    1300  //max 3 axis mdd2000, same as DRIVEMNG_BUSDEVICEID_MDD2000_A111 (old define left for compatibillity)
  #define DRIVEMNG_BUSDEVICEID_VSDC151    1301  //1 axis Saacke version
  #define DRIVEMNG_I_TYPE_VSDC151         1
  #define DRIVEMNG_I_TYPE_VSDC152         2
  // Defines for MDD2000 with different Axis Configuration, _AXXX, x = 1 axis available at this position
  #define DRIVEMNG_BUSDEVICEID_MDD2000_A111   1300 // 3 axis mdd2000
  #define DRIVEMNG_BUSDEVICEID_MDD2000_A000   1337 // 0 axis mdd2000 (Only Power supply)
  #define DRIVEMNG_BUSDEVICEID_MDD2000_A100   1338 // 1 axis mdd2000
  #define DRIVEMNG_BUSDEVICEID_MDD2000_A010   1339 // 1 axis mdd2000
  #define DRIVEMNG_BUSDEVICEID_MDD2000_A001   1340 // 1 axis mdd2000
  #define DRIVEMNG_BUSDEVICEID_MDD2000_A110   1341 // 2 axis mdd2000
  #define DRIVEMNG_BUSDEVICEID_MDD2000_A101   1342 // 2 axis mdd2000
  #define DRIVEMNG_BUSDEVICEID_MDD2000_A011   1343 // 2 axis mdd2000
  
  
  //drives sdias 
  #define DRIVEMNG_BUSDEVICEID_DC061      1042 //SDIAS Drive 6A Resolver
  #define DRIVEMNG_BUSDEVICEID_DC062      1801 //SDIAS Drive 6A Incremental Encoder
  #define DRIVEMNG_BUSDEVICEID_SR011      1802 //SDIAS DC Motor Drive 5A Incremental Encoder
  #define DRIVEMNG_BUSDEVICEID_SR011_1    1808 //SDIAS DC Motor Drive 5A Incremental Encoder (Derived from SR011 with lower switching frequency and reduced TTL encoder input frequency) 
  #define DRIVEMNG_BUSDEVICEID_SR012      1803 //SDIAS DC Motor Drive 5A
  #define DRIVEMNG_BUSDEVICEID_DC101      1804 //SDIAS DC Motor Drive 48V 10A Resolver
  #define DRIVEMNG_BUSDEVICEID_DC102      1805 //SDIAS DC Motor Drive 48V 10A Incremental Encoder
  #define DRIVEMNG_BUSDEVICEID_DC064      1806 //SDIAS Drive 6A Digital Encoder
  #define DRIVEMNG_BUSDEVICEID_DC104      1807 //SDIAS Drive 10A Digital Encoder
  
  //drives varanS2
  #define DRIVEMNG_BUSDEVICEID_WA011      1800
  #define DRIVEMNG_BUSDEVICEID_WA012      1801
  //
  
  //*****
  #define DRIVEMNG_MDD2000FWVERSION_HIPERFACEDSL 130 // 1.30 




#endif