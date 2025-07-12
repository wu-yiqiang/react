export const supportFiles = [
  { fileSuffix: '.pdf', icon: 'pdf' },
  { fileSuffix: '.png', icon: 'image' },
  { fileSuffix: '.jpg', icon: 'image' },
  { fileSuffix: '.jpeg', icon: 'image' },
  { fileSuffix: '.webp', icon: 'image' },
  { fileSuffix: '.mp4', icon: 'video' },
  // { fileSuffix: '.txt', icon: 'txt' },
  // { fileSuffix: '.mp3', icon: 'mp3' },
  // { fileSuffix: '.doc', icon: 'doc' },
  // { fileSuffix: '.xls', icon: 'xls' },
  // { fileSuffix: '.ppt', icon: 'ppt' }
]

export const supportFilesArray = supportFiles?.map((item) => 
  {return item?.fileSuffix}
  )

export const supportFileTypeString = supportFilesArray?.join(',')

export const fileExtension = (fileName: string) => {
  return '.' + fileName?.split('.').pop()
}
