export default [
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_allo',
        'type': 'address'
      },
      {
        'internalType': 'string',
        'name': '_name',
        'type': 'string'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'recipientId',
        'type': 'address'
      }
    ],
    'name': 'RECIPIENT_ERROR',
    'type': 'error'
  },
  {
    'inputs': [],
    'name': 'UNAUTHORIZED',
    'type': 'error'
  },
  {
    'inputs': [],
    'name': 'INVALID',
    'type': 'error'
  },
  {
    'inputs': [],
    'name': 'REGISTRATION_NOT_ACTIVE',
    'type': 'error'
  },
  {
    'inputs': [],
    'name': 'ALLOCATION_NOT_ACTIVE',
    'type': 'error'
  },
  {
    'inputs': [],
    'name': 'ALLOCATION_NOT_ENDED',
    'type': 'error'
  },
  {
    'inputs': [],
    'name': 'INVALID_METADATA',
    'type': 'error'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_poolId',
        'type': 'uint256'
      },
      {
        'internalType': 'bytes',
        'name': '_data',
        'type': 'bytes'
      }
    ],
    'name': 'initialize',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_allocator',
        'type': 'address'
      }
    ],
    'name': 'addAllocator',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_allocator',
        'type': 'address'
      }
    ],
    'name': 'removeAllocator',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_recipientId',
        'type': 'address'
      }
    ],
    'name': 'getRecipient',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'totalVotesReceived',
            'type': 'uint256'
          },
          {
            'internalType': 'bool',
            'name': 'useRegistryAnchor',
            'type': 'bool'
          },
          {
            'internalType': 'address',
            'name': 'recipientAddress',
            'type': 'address'
          },
          {
            'components': [
              {
                'internalType': 'uint256',
                'name': 'protocol',
                'type': 'uint256'
              },
              {
                'internalType': 'string',
                'name': 'pointer',
                'type': 'string'
              }
            ],
            'internalType': 'struct Metadata',
            'name': 'metadata',
            'type': 'tuple'
          },
          {
            'internalType': 'enum IStrategy.Status',
            'name': 'recipientStatus',
            'type': 'uint8'
          },
          {
            'internalType': 'uint256',
            'name': 'applicationId',
            'type': 'uint256'
          }
        ],
        'internalType': 'struct QVBaseStrategy.Recipient',
        'name': '',
        'type': 'tuple'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address[]',
        'name': '_recipientIds',
        'type': 'address[]'
      },
      {
        'internalType': 'enum IStrategy.Status[]',
        'name': '_recipientStatuses',
        'type': 'uint8[]'
      }
    ],
    'name': 'reviewRecipients',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint64',
        'name': '_registrationStartTime',
        'type': 'uint64'
      },
      {
        'internalType': 'uint64',
        'name': '_registrationEndTime',
        'type': 'uint64'
      },
      {
        'internalType': 'uint64',
        'name': '_allocationStartTime',
        'type': 'uint64'
      },
      {
        'internalType': 'uint64',
        'name': '_allocationEndTime',
        'type': 'uint64'
      }
    ],
    'name': 'updatePoolTimestamps',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_token',
        'type': 'address'
      }
    ],
    'name': 'withdraw',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'maxVoiceCreditsPerAllocator',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'name': 'allowedAllocators',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'totalRecipientVotes',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'reviewThreshold',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'registrationStartTime',
    'outputs': [
      {
        'internalType': 'uint64',
        'name': '',
        'type': 'uint64'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'registrationEndTime',
    'outputs': [
      {
        'internalType': 'uint64',
        'name': '',
        'type': 'uint64'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'allocationStartTime',
    'outputs': [
      {
        'internalType': 'uint64',
        'name': '',
        'type': 'uint64'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'allocationEndTime',
    'outputs': [
      {
        'internalType': 'uint64',
        'name': '',
        'type': 'uint64'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'registryGating',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'metadataRequired',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'distributionStarted',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'stateMutability': 'payable',
    'type': 'receive'
  }
];
