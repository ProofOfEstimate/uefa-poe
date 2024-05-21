/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/poe.json`.
 */
export type Poe = {
  address: "485U8Ea7YoM6Nd5QR7AmZu34RBeMTG5P3iG5KAEcecTi";
  metadata: {
    name: "poe";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Proof of Estimate - Prediction Poll";
  };
  instructions: [
    {
      name: "collectPoints";
      discriminator: [221, 8, 237, 153, 212, 171, 156, 131];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "forecaster";
        },
        {
          name: "user";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114];
              },
              {
                kind: "account";
                path: "forecaster";
              }
            ];
          };
        },
        {
          name: "poll";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 108, 108];
              },
              {
                kind: "account";
                path: "poll.id";
                account: "poll";
              }
            ];
          };
        },
        {
          name: "userEstimate";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  101,
                  115,
                  116,
                  105,
                  109,
                  97,
                  116,
                  101
                ];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "forecaster";
              }
            ];
          };
        },
        {
          name: "scoringList";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  99,
                  111,
                  114,
                  105,
                  110,
                  103,
                  95,
                  108,
                  105,
                  115,
                  116
                ];
              },
              {
                kind: "account";
                path: "poll";
              }
            ];
          };
        },
        {
          name: "userScore";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 115, 99, 111, 114, 101];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "forecaster";
              }
            ];
          };
        },
        {
          name: "mint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 101, 107, 101, 110, 95, 109, 105, 110, 116];
              }
            ];
          };
        },
        {
          name: "escrowAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [101, 115, 99, 114, 111, 119];
              }
            ];
          };
        },
        {
          name: "forecasterTokenAccount";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "createPoll";
      discriminator: [182, 171, 112, 238, 6, 219, 14, 110];
      accounts: [
        {
          name: "creator";
          writable: true;
          signer: true;
        },
        {
          name: "resolver";
        },
        {
          name: "state";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 101, 95, 115, 116, 97, 116, 101];
              }
            ];
          };
        },
        {
          name: "poll";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 108, 108];
              },
              {
                kind: "account";
                path: "state.num_polls";
                account: "poeState";
              }
            ];
          };
        },
        {
          name: "scoringList";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  99,
                  111,
                  114,
                  105,
                  110,
                  103,
                  95,
                  108,
                  105,
                  115,
                  116
                ];
              },
              {
                kind: "account";
                path: "poll";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "question";
          type: "string";
        },
        {
          name: "description";
          type: "string";
        },
        {
          name: "category";
          type: "u16";
        },
        {
          name: "decay";
          type: "f32";
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "state";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 101, 95, 115, 116, 97, 116, 101];
              }
            ];
          };
        },
        {
          name: "mint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 101, 107, 101, 110, 95, 109, 105, 110, 116];
              }
            ];
          };
        },
        {
          name: "escrowAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [101, 115, 99, 114, 111, 119];
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "makeEstimate";
      discriminator: [169, 43, 178, 59, 233, 178, 74, 199];
      accounts: [
        {
          name: "forecaster";
          writable: true;
          signer: true;
        },
        {
          name: "user";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114];
              },
              {
                kind: "account";
                path: "forecaster";
              }
            ];
          };
        },
        {
          name: "poll";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 108, 108];
              },
              {
                kind: "account";
                path: "poll.id";
                account: "poll";
              }
            ];
          };
        },
        {
          name: "userEstimate";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  101,
                  115,
                  116,
                  105,
                  109,
                  97,
                  116,
                  101
                ];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "forecaster";
              }
            ];
          };
        },
        {
          name: "pollEstimateUpdate";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  111,
                  108,
                  108,
                  95,
                  101,
                  115,
                  116,
                  105,
                  109,
                  97,
                  116,
                  101,
                  95,
                  117,
                  112,
                  100,
                  97,
                  116,
                  101
                ];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "poll.num_estimate_updates";
                account: "poll";
              }
            ];
          };
        },
        {
          name: "scoringList";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  99,
                  111,
                  114,
                  105,
                  110,
                  103,
                  95,
                  108,
                  105,
                  115,
                  116
                ];
              },
              {
                kind: "account";
                path: "poll";
              }
            ];
          };
        },
        {
          name: "userScore";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 115, 99, 111, 114, 101];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "forecaster";
              }
            ];
          };
        },
        {
          name: "forecasterTokenAccount";
          writable: true;
        },
        {
          name: "mint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 101, 107, 101, 110, 95, 109, 105, 110, 116];
              }
            ];
          };
        },
        {
          name: "escrowAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [101, 115, 99, 114, 111, 119];
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "lowerEstimate";
          type: "u16";
        },
        {
          name: "upperEstimate";
          type: "u16";
        }
      ];
    },
    {
      name: "registerUser";
      discriminator: [2, 241, 150, 223, 99, 214, 116, 97];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "user";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114];
              },
              {
                kind: "account";
                path: "payer";
              }
            ];
          };
        },
        {
          name: "mint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 101, 107, 101, 110, 95, 109, 105, 110, 116];
              }
            ];
          };
        },
        {
          name: "tokenAccount";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "removeEstimate";
      discriminator: [123, 41, 255, 206, 43, 234, 150, 38];
      accounts: [
        {
          name: "forecaster";
          writable: true;
          signer: true;
        },
        {
          name: "user";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114];
              },
              {
                kind: "account";
                path: "forecaster";
              }
            ];
          };
        },
        {
          name: "poll";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 108, 108];
              },
              {
                kind: "account";
                path: "poll.id";
                account: "poll";
              }
            ];
          };
        },
        {
          name: "userEstimate";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  101,
                  115,
                  116,
                  105,
                  109,
                  97,
                  116,
                  101
                ];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "forecaster";
              }
            ];
          };
        },
        {
          name: "estimateUpdate";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  111,
                  108,
                  108,
                  95,
                  101,
                  115,
                  116,
                  105,
                  109,
                  97,
                  116,
                  101,
                  95,
                  117,
                  112,
                  100,
                  97,
                  116,
                  101
                ];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "poll.num_estimate_updates";
                account: "poll";
              }
            ];
          };
        },
        {
          name: "scoringList";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  99,
                  111,
                  114,
                  105,
                  110,
                  103,
                  95,
                  108,
                  105,
                  115,
                  116
                ];
              },
              {
                kind: "account";
                path: "poll";
              }
            ];
          };
        },
        {
          name: "userScore";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 115, 99, 111, 114, 101];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "forecaster";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "resolvePoll";
      discriminator: [130, 62, 235, 12, 76, 239, 17, 61];
      accounts: [
        {
          name: "resolver";
          writable: true;
          signer: true;
          relations: ["poll"];
        },
        {
          name: "poll";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 108, 108];
              },
              {
                kind: "account";
                path: "poll.id";
                account: "poll";
              }
            ];
          };
        },
        {
          name: "scoringList";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  99,
                  111,
                  114,
                  105,
                  110,
                  103,
                  95,
                  108,
                  105,
                  115,
                  116
                ];
              },
              {
                kind: "account";
                path: "poll";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "result";
          type: "bool";
        }
      ];
    },
    {
      name: "updateEstimate";
      discriminator: [16, 66, 42, 145, 179, 218, 133, 181];
      accounts: [
        {
          name: "forecaster";
          writable: true;
          signer: true;
        },
        {
          name: "poll";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 108, 108];
              },
              {
                kind: "account";
                path: "poll.id";
                account: "poll";
              }
            ];
          };
        },
        {
          name: "userEstimate";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  101,
                  115,
                  116,
                  105,
                  109,
                  97,
                  116,
                  101
                ];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "forecaster";
              }
            ];
          };
        },
        {
          name: "userEstimateUpdate";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  95,
                  101,
                  115,
                  116,
                  105,
                  109,
                  97,
                  116,
                  101,
                  95,
                  117,
                  112,
                  100,
                  97,
                  116,
                  101
                ];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "forecaster";
              },
              {
                kind: "account";
                path: "user_estimate.num_estimate_updates";
                account: "userEstimate";
              }
            ];
          };
        },
        {
          name: "estimateUpdate";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  111,
                  108,
                  108,
                  95,
                  101,
                  115,
                  116,
                  105,
                  109,
                  97,
                  116,
                  101,
                  95,
                  117,
                  112,
                  100,
                  97,
                  116,
                  101
                ];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "poll.num_estimate_updates";
                account: "poll";
              }
            ];
          };
        },
        {
          name: "scoringList";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  99,
                  111,
                  114,
                  105,
                  110,
                  103,
                  95,
                  108,
                  105,
                  115,
                  116
                ];
              },
              {
                kind: "account";
                path: "poll";
              }
            ];
          };
        },
        {
          name: "userScore";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 115, 99, 111, 114, 101];
              },
              {
                kind: "account";
                path: "poll";
              },
              {
                kind: "account";
                path: "forecaster";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "newLowerEstimate";
          type: "u16";
        },
        {
          name: "newUpperEstimate";
          type: "u16";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "poeState";
      discriminator: [56, 89, 110, 49, 245, 252, 16, 20];
    },
    {
      name: "poll";
      discriminator: [110, 234, 167, 188, 231, 136, 153, 111];
    },
    {
      name: "pollEstimateUpdate";
      discriminator: [140, 170, 34, 23, 150, 213, 62, 18];
    },
    {
      name: "scoringList";
      discriminator: [200, 108, 113, 50, 15, 45, 206, 81];
    },
    {
      name: "user";
      discriminator: [159, 117, 95, 227, 239, 151, 58, 236];
    },
    {
      name: "userEstimate";
      discriminator: [4, 202, 200, 189, 121, 204, 147, 101];
    },
    {
      name: "userEstimateUpdate";
      discriminator: [231, 183, 179, 64, 195, 152, 147, 122];
    },
    {
      name: "userScore";
      discriminator: [212, 150, 123, 224, 34, 227, 84, 39];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "pollClosed";
      msg: "Poll is closed.";
    },
    {
      code: 6001;
      name: "pollNotResolved";
      msg: "Poll has not been resolved.";
    },
    {
      code: 6002;
      name: "pollAlreadyResolved";
      msg: "Poll has already been resolved.";
    }
  ];
  types: [
    {
      name: "poeState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "numPolls";
            type: "u64";
          },
          {
            name: "score";
            type: "f32";
          },
          {
            name: "recalibrationFactor";
            type: "f32";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "poll";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "resolver";
            type: "pubkey";
          },
          {
            name: "id";
            type: "u64";
          },
          {
            name: "category";
            type: "u16";
          },
          {
            name: "bettingAmount";
            type: "u64";
          },
          {
            name: "startSlot";
            type: "u64";
          },
          {
            name: "endSlot";
            type: {
              option: "u64";
            };
          },
          {
            name: "decayRate";
            type: "f32";
          },
          {
            name: "collectiveEstimate";
            type: {
              option: "u32";
            };
          },
          {
            name: "variance";
            type: {
              option: "f32";
            };
          },
          {
            name: "lnGmA";
            type: {
              option: "f32";
            };
          },
          {
            name: "lnGmB";
            type: {
              option: "f32";
            };
          },
          {
            name: "numForecasters";
            type: "u64";
          },
          {
            name: "numEstimateUpdates";
            type: "u64";
          },
          {
            name: "accumulatedWeights";
            type: "f32";
          },
          {
            name: "accumulatedWeightsSquared";
            type: "f32";
          },
          {
            name: "result";
            type: {
              option: "bool";
            };
          },
          {
            name: "question";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "pollEstimateUpdate";
      type: {
        kind: "struct";
        fields: [
          {
            name: "poll";
            type: "pubkey";
          },
          {
            name: "slot";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          },
          {
            name: "estimate";
            type: {
              option: "u32";
            };
          },
          {
            name: "variance";
            type: {
              option: "f32";
            };
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "scoringList";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "options";
            type: {
              array: ["f32", 128];
            };
          },
          {
            name: "cost";
            type: {
              array: ["f32", 128];
            };
          },
          {
            name: "peerScoreA";
            type: {
              array: ["f32", 128];
            };
          },
          {
            name: "peerScoreB";
            type: {
              array: ["f32", 128];
            };
          },
          {
            name: "lastSlot";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "user";
      type: {
        kind: "struct";
        fields: [
          {
            name: "score";
            type: "f32";
          },
          {
            name: "participationCount";
            type: "u32";
          },
          {
            name: "correctAnswersCount";
            type: "u32";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "userEstimate";
      type: {
        kind: "struct";
        fields: [
          {
            name: "forecaster";
            type: "pubkey";
          },
          {
            name: "poll";
            type: "pubkey";
          },
          {
            name: "lowerEstimate";
            type: "u16";
          },
          {
            name: "upperEstimate";
            type: "u16";
          },
          {
            name: "scoreWeight";
            type: "f32";
          },
          {
            name: "recencyWeight";
            type: "f32";
          },
          {
            name: "numForecasters";
            type: "u64";
          },
          {
            name: "numEstimateUpdates";
            type: "u64";
          },
          {
            name: "options";
            type: {
              option: "f32";
            };
          },
          {
            name: "cost";
            type: {
              option: "f32";
            };
          },
          {
            name: "lnA";
            type: {
              option: "f32";
            };
          },
          {
            name: "lnB";
            type: {
              option: "f32";
            };
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "userEstimateUpdate";
      type: {
        kind: "struct";
        fields: [
          {
            name: "poll";
            type: "pubkey";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "slot";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          },
          {
            name: "lowerEstimate";
            type: "u16";
          },
          {
            name: "upperEstimate";
            type: "u16";
          }
        ];
      };
    },
    {
      name: "userScore";
      type: {
        kind: "struct";
        fields: [
          {
            name: "forecaster";
            type: "pubkey";
          },
          {
            name: "poll";
            type: "pubkey";
          },
          {
            name: "options";
            type: "f32";
          },
          {
            name: "lastLowerOption";
            type: "f32";
          },
          {
            name: "lastUpperOption";
            type: "f32";
          },
          {
            name: "cost";
            type: "f32";
          },
          {
            name: "lastLowerCost";
            type: "f32";
          },
          {
            name: "lastUpperCost";
            type: "f32";
          },
          {
            name: "lastPeerScoreA";
            type: "f32";
          },
          {
            name: "lastPeerScoreB";
            type: "f32";
          },
          {
            name: "lnA";
            type: "f32";
          },
          {
            name: "lnB";
            type: "f32";
          },
          {
            name: "peerScoreA";
            type: "f32";
          },
          {
            name: "peerScoreB";
            type: "f32";
          },
          {
            name: "lastSlot";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
};
