// We import Chai to use its asserting functions here.
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.
// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.

describe("PaySplitter contract", function () {
 // Mocha has four functions that let you hook into the the test runner's
 // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.
 // They're very useful to setup the environment for tests, and to clean it
 // up after they run.
 // A common pattern is to declare some variables, and assign them in the
 // `before` and `beforeEach` callbacks.
 let PaySplitter;
 let contract: Contract;
 let owner: SignerWithAddress;
 let addr1: SignerWithAddress;
 let addr2: SignerWithAddress;
 let addr3: SignerWithAddress;
 let addrs: SignerWithAddress[];
 let ownerWeight: number = 6;
 let weight1: number = 4;
 let weight2: number = 2;
 let weight3: number = 8;
 // `beforeEach` will run before each test, re-deploying the contract every
 // time. It receives a callback, which can be async.
 
 beforeEach(async function () {
   // Get the ContractFactory and Signers here.
   PaySplitter = await ethers.getContractFactory("PaySplitter");
   [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
   // To deploy our contract, we just have to call PaySplitter.deploy() and await
   // for it to be deployed(), which happens once its transaction has been
   // mined.
   contract = await PaySplitter.deploy([owner.address, addr1.address], [ownerWeight,weight1]);
 });
 // You can nest describe calls to create subsections.
 
 describe("Deployment", function () {
   // `it` is another Mocha function. This is the one you use to define your
   // tests. It receives the test name, and a callback function.
   // If the callback function is async, Mocha will `await` it.
   
   it("Should set the right totalWeights", async function () {
     // Expect receives a value, and wraps it in an Assertion object. These
     // objects have a lot of utility methods to assert values.
     // This test expects the owner variable stored in the contract to be equal
     // to our Signer's owner.
     expect(await contract.weight(owner.address)).to.equal(ownerWeight);
     expect(await contract.weight(addr1.address)).to.equal(weight1);
     expect(await contract.totalWeights()).to.equal(ownerWeight + weight1);
   });
   
//    it("Should assign the total supply of tokens to the owner", async function () {
//      const ownerBalance = await contract.balanceOf(owner.address);
//      expect(await contract.totalSupply()).to.equal(ownerBalance);
//    });
 });
 
//  describe("Transactions", function () {
   
//    it("Should transfer tokens between accounts", async function () {
//      // Transfer 50 tokens from owner to addr1
//      await contract.transfer(addr1.address, 50);
//      const addr1Balance = await contract.balanceOf(addr1.address);
//      expect(addr1Balance).to.equal(50);
//      // Transfer 50 tokens from addr1 to addr2
//      // We use .connect(signer) to send a transaction from another account
//      await contract.connect(addr1).transfer(addr2.address, 50);
//      const addr2Balance = await contract.balanceOf(addr2.address);
//      expect(addr2Balance).to.equal(50);
//    });
   
//    it("Should fail if sender doesn’t have enough tokens", async function () {
//      const initialOwnerBalance = await contract.balanceOf(owner.address);
//      // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
//      // `require` will evaluate false and revert the transaction.
//      await expect(
//        contract.connect(addr1).transfer(owner.address, 1)
//      ).to.be.revertedWith("Not enough tokens");
//      // Owner balance shouldn't have changed.
//      expect(await contract.balanceOf(owner.address)).to.equal(
//        initialOwnerBalance
//      );
//    });
   
//    it("Should update balances after transfers", async function () {
//      const initialOwnerBalance = await contract.balanceOf(owner.address);
//      // Transfer 100 tokens from owner to addr1.
//      await contract.transfer(addr1.address, 100);
//      // Transfer another 50 tokens from owner to addr2.
//      await contract.transfer(addr2.address, 50);
//      // Check balances.
//      const finalOwnerBalance = await contract.balanceOf(owner.address);
//      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);
//      const addr1Balance = await contract.balanceOf(addr1.address);
//      expect(addr1Balance).to.equal(100);
//      const addr2Balance = await contract.balanceOf(addr2.address);
//      expect(addr2Balance).to.equal(50);
//    });
//  });
});