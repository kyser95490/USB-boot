
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface DriveInfo {
  id: string;
  name: string;
  size: string;
  type: string;
}

export enum CreationStatus {
  IDLE = 'IDLE',
  PREPARING = 'PREPARING',
  FORMATTING = 'FORMATTING',
  COPYING = 'COPYING',
  FINALIZING = 'FINALIZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface ToolSettings {
  driveId: string;
  isoPath: string;
  partitionScheme: 'GPT' | 'MBR';
  targetSystem: 'UEFI' | 'BIOS';
  fileSystem: 'FAT32' | 'NTFS';
}
